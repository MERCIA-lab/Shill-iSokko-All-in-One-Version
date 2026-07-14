import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

const SHIPMENTS = [
  { id: "1", ref: "SHIP-0001", route: "Kyiv → Rivne", status: "In transit" },
  { id: "2", ref: "SHIP-0002", route: "Lviv → Kharkiv", status: "Pending" },
  { id: "3", ref: "SHIP-0003", route: "Odesa → Kyiv", status: "Delivered" }
];

export function ShipmentsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Shipment</Text>
      <FlatList
        data={SHIPMENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.ref}>{item.ref}</Text>
              <Text style={styles.muted}>{item.route}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg, paddingTop: 20 },
  title: { fontSize: 22, fontWeight: "600", color: colors.ink, marginHorizontal: 20, marginBottom: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14
  },
  ref: { fontWeight: "600", color: colors.ink },
  muted: { color: colors.muted, fontSize: 12, marginTop: 2 },
  badge: { backgroundColor: colors.red, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "600" }
});
