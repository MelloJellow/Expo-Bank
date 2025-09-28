// app/index.tsx
import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from "react-native";
import CardOverlay from "@/components/BankCard";
import { DataTable } from "react-native-paper";

export default function Index() {
  const { width } = useWindowDimensions();
  const isWide = Platform.OS === "web" && width >= 900;

  const CardBox = (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Your card</Text>
      {/* Force full width inside the box */}
      <CardOverlay
        name="Bob Johnson"
        last4="4207"
        balance={1000.37}
        style={{ width: "100%", maxWidth: 9999 }}
      />
    </View>
  );

  const TableBox = (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Recent transactions</Text>
      <View style={styles.tableWrap}>
        <DataTable style={{ width: "100%" }}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title textStyle={styles.tableText}>Date</DataTable.Title>
            <DataTable.Title textStyle={styles.tableText}>
              Merchant
            </DataTable.Title>
            <DataTable.Title numeric textStyle={styles.tableText}>
              Amount
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row>
            <DataTable.Cell textStyle={styles.tableText}>
              09/27/2025
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.tableText}>Steam</DataTable.Cell>
            <DataTable.Cell numeric textStyle={styles.tableText}>
              £-29.99
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell textStyle={styles.tableText}>
              09/26/2025
            </DataTable.Cell>
            <DataTable.Cell textStyle={styles.tableText}>Matars</DataTable.Cell>
            <DataTable.Cell numeric textStyle={styles.tableText}>
              £-12.47
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Home</Text>

      {isWide ? (
        <View style={styles.row}>
          <View style={styles.col}>{CardBox}</View>
          <View style={styles.col}>{TableBox}</View>
        </View>
      ) : (
        <>
          {CardBox}
          {TableBox}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#25292e" },
  content: { padding: 16, gap: 12 },
  title: { color: "#fff", fontSize: 18, fontWeight: "700", marginBottom: 4 },

  row: { flexDirection: "row", gap: 12, width: "100%" },
  col: { flex: 1 },

  // Reusable “box” card style (matches your help screen vibe)
  card: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    padding: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardTitle: {
    color: "#fff",
    fontWeight: "700",
    marginBottom: 8,
    opacity: 0.9,
  },

  // Table styling
  tableWrap: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.12)",
  },
  tableHeader: { backgroundColor: "rgba(255,255,255,0.06)" },
  tableText: { color: "#fff" },
});
