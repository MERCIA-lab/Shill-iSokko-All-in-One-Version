import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

const CUSTOMERS = [
  { id: "1", name: "Michael Johnson", country: "Ukraine", rating: "4.2" },
  { id: "2", name: "Olena Petrenko", country: "Ukraine", rating: "4.8" }
];

export function CustomersScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Costumer</Text>
      <FlatList
        data={CUSTOMERS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.muted}>{item.country}</Text>
            </View>
            <Text style={styles.rating}>★ {item.rating}</Text>
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
  name: { fontWeight: "600", color: colors.ink },
  muted: { color: colors.muted, fontSize: 12, marginTop: 2 },
  rating: { color: colors.red, fontWeight: "600" }
});
