/* eslint-disable react/jsx-no-undef */
import React, { useRef, useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";

export default function ChqScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Checking camera permission..</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          We need your permission to use the camera.
        </Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Grant Access</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const takePhoto = async () => {
    if (!cameraRef.current || busy) return;
    try {
      setBusy(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });
      setPhotoUri(photo?.uri ?? null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chq Scanner</Text>

      {photoUri ? (
        <>
          <Image
            source={{ uri: photoUri }}
            style={styles.preview}
            contentFit="cover"
          />
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.btn, styles.btnSecondary]}
              onPress={() => setPhotoUri(null)}
            >
              <Text style={styles.btnText}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                // TODO: send photoUri to backend / next step
              }}
            >
              <Text style={styles.btnText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.cameraWrap}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              autofocus="on"
              ratio="16:9"
            />
          </View>
          <TouchableOpacity
            style={styles.shutter}
            onPress={takePhoto}
            disabled={busy}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingTop: 16,
    alignItems: "center",
  },
  title: { color: "white", marginBottom: 8, fontSize: 16 },
  text: { color: "white" },

  cameraWrap: {
    width: "92%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.15)",
  },
  camera: { flex: 1 },

  shutter: {
    marginTop: 14,
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  shutterInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fff",
  },

  preview: { width: "92%", aspectRatio: 16 / 9, borderRadius: 12 },
  row: { flexDirection: "row", gap: 12, marginTop: 12 },
  btn: {
    backgroundColor: "#7A55FF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnSecondary: { backgroundColor: "#3a3f47" },
  btnText: { color: "#fff", fontWeight: "600" },
});
