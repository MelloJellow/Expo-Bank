// components/CardOverlay.tsx
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type Props = {
  name?: string;
  last4?: string;
  balance?: number | string;
  pin?: string; // shows "PIN ••••" if provided
  source?: ImageSourcePropType; // card image (PNG/JPG/WebP)
  style?: StyleProp<ViewStyle>; // e.g., { width: 300 } or { width: '90%' }
};

export default function CardOverlay({
  name = "Bob Johnson",
  last4 = "4207",
  balance = 1000.37,
  pin,
  // change this to your file, e.g. require('../assets/purpcard.png')
  source = require("../assets/images/purpcard.png"),
  style,
}: Props) {
  const amountText =
    typeof balance === "number"
      ? new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "GBP",
        }).format(balance)
      : String(balance);

  return (
    <ImageBackground
      source={source}
      resizeMode="cover"
      style={[styles.bg, style]}
      imageStyle={styles.img}
    >
      <View style={styles.content}>
        {pin ? <Text style={styles.pin}>PIN ••••</Text> : null}

        <Text style={styles.number}>{`••••  ••••  ••••  ${last4}`}</Text>

        <View style={styles.row}>
          <View>
            <FontAwesome6
              name="sim-card"
              size={24}
              color="yellow"
              style={{ transform: [{ rotate: "90deg" }] }} // e.g., '90deg', '-90deg', '180deg'
            />
            <Text style={styles.label}>Card Holder</Text>
            <Text style={styles.white} numberOfLines={1}>
              {name}
            </Text>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.label}>Available</Text>
            <Text style={styles.white}>{amountText}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // Control size by width (keeps ISO credit-card ratio)
  bg: {
    width: "90%",
    maxWidth: 380,
    aspectRatio: 1.586,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "center",
  },
  img: { borderRadius: 16 },

  // Push content to the bottom of the card
  content: { flex: 1, padding: 16, justifyContent: "flex-end" },

  // ↓ Move labels UP by increasing marginBottom (extra space below them)
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 12, // try 12–20 to raise/lower the bottom labels
  },

  // Card number (placed just above the row)
  number: {
    color: "#fff",
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 89, // smaller = lower (closer to labels)
    textShadowColor: "#000",
    textShadowRadius: 2,
  },

  rightCol: {
    alignItems: "flex-end",
    marginRight: 40,
  },

  label: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  white: {
    color: "#fff",
    fontWeight: "700",
    textShadowColor: "#000",
    textShadowRadius: 1,
  },

  // Pin stays fixed at top-right; it won't affect layout
  pin: {
    position: "absolute",
    top: 12,
    right: 12,
    color: "#fff",
    opacity: 0.9,
    fontSize: 12,
  },
});
/* ---------------------------
   Example usage in a screen:
   ---------------------------
   import CardOverlay from '../components/CardOverlay';

   export default function Index() {
     return (
       <View style={{ flex: 1, backgroundColor: '#12161c', justifyContent: 'center', alignItems: 'center' }}>
         <CardOverlay
           name="Angelo Clarke"
           last4="4207"
           balance={1000.37}
           source={require('../assets/purpcard.png')} // your image file
           style={{ width: 300 }}                    // or { width: '88%' }
         />
       </View>
     );
   }
*/
