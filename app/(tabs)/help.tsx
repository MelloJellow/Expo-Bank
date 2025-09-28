// app/help.tsx
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";

type LinkItem = { id: string; label: string };
type SuggestItem = { id: string; title: string; subtitle?: string };

const quickLinks: LinkItem[] = [
  { id: "freeze", label: "Freeze Card" },
  { id: "replace", label: "Replace Card" },
  { id: "pin", label: "View/Change PIN" },
  { id: "dispute", label: "Dispute a charge" },
  { id: "limits", label: "Limits & fees" },
  { id: "support", label: "Contact support" },
];

const suggested: SuggestItem[] = [
  {
    id: "pending",
    title: "Why is a transaction pending?",
    subtitle: "Card payments",
  },
  { id: "chargeback", title: "Chargeback timelines" },
  { id: "verify", title: "Verify your identity", subtitle: "Account" },
];

export default function HelpScreen() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return suggested;
    return suggested.filter(
      (s) =>
        s.title.toLowerCase().includes(t) ||
        s.subtitle?.toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* Search box */}
      <View style={styles.card}>
        <Text style={styles.heading}>Search</Text>
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search help"
          placeholderTextColor="rgba(255,255,255,0.6)"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Quick Links */}
      <View style={styles.card}>
        <Text style={styles.heading}>Quick links</Text>
        <View style={styles.grid}>
          {quickLinks.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.tile,
                pressed && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.tileText}>{item.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Suggested for you */}
      <View style={styles.card}>
        <Text style={styles.heading}>Suggested for you</Text>
        <View style={{ gap: 8 }}>
          {filtered.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]}
            >
              <View>
                <Text style={styles.rowTitle}>{item.title}</Text>
                {item.subtitle ? (
                  <Text style={styles.rowSub}>{item.subtitle}</Text>
                ) : null}
              </View>
              <Text style={styles.chev}>›</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#25292e" },
  content: { padding: 16, gap: 12 },
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
  },
  heading: { color: "#fff", fontSize: 14, fontWeight: "700", marginBottom: 8 },
  input: {
    backgroundColor: "rgba(0,0,0,0.25)",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },

  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tile: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "48%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
  },
  tileText: { color: "#fff", fontWeight: "600" },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
  },
  rowTitle: { color: "#fff", fontWeight: "600" },
  rowSub: { color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 },
  chev: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 22,
    marginLeft: 8,
    lineHeight: 22,
  },
});
