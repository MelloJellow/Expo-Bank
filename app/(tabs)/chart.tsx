// app/about.tsx (or your AboutScreen)
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function AboutScreen() {
  // dummy data; replace with API data later
  const data = [
    { value: 0.012, label: "Oct", date: "01 Oct 2022" },
    { value: 0.018, label: "Nov", date: "01 Nov 2022" },
    { value: 0.046, label: "Dec", date: "01 Dec 2022" },
    { value: 0.025, label: "Jan", date: "01 Jan 2023" },
    { value: 0.017, label: "Feb", date: "01 Feb 2023" },
    { value: 0.029, label: "Mar", date: "01 Mar 2023" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Screen</Text>

      <View style={styles.card}>
        <LineChart
          data={data}
          areaChart
          curved
          thickness={2.5}
          color="#22c55e"
          startFillColor="rgba(34,197,94,0.35)"
          endFillColor="rgba(34,197,94,0.05)"
          startOpacity={1}
          endOpacity={1}
          hideDataPoints
          initialSpacing={12}
          yAxisTextStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 10 }}
          xAxisLabelTextStyle={{ color: "rgba(255,255,255,0.8)", fontSize: 10 }}
          yAxisLabelPrefix="$"
          yAxisThickness={0}
          xAxisThickness={0}
          rulesType="dashed"
          rulesColor="rgba(255,255,255,0.12)"
          yAxisLabelWidth={40}
          // pointer like the screenshot:
          pointerConfig={{
            showPointerStrip: true,
            pointerStripHeight: 180,
            pointerStripColor: "rgba(255,255,255,0.25)",
            radius: 4,
            pointerColor: "#fff",
            pointerLabelWidth: 140,
            pointerLabelHeight: 56,
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (items: any[]) => {
              const it = items[0];
              return (
                <View style={styles.tip}>
                  <Text style={styles.tipDate}>{it?.date}</Text>
                  <Text style={styles.tipVal}>
                    ${Number(it?.value ?? 0).toFixed(6)}
                  </Text>
                </View>
              );
            },
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e", padding: 16, gap: 12 },
  title: { color: "#fff", fontSize: 18, fontWeight: "700" },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
  },
  tip: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: "center",
  },
  tipDate: { color: "#000", fontSize: 12, fontWeight: "600" },
  tipVal: { color: "#000", fontSize: 14, fontWeight: "800" },
});
