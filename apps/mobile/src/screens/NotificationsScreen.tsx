import { FlatList, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

const NOTIFICATIONS = [
  { id: "1", title: "Geofencing alert", body: "Truck crossed geofence at Warehouse A." },
  { id: "2", title: "Shipment delayed", body: "SHIP-0004 is running 25 minutes behind schedule." }
];

export function NotificationsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Notification</Text>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.muted}>{item.body}</Text>
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
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
    padding: 14
  },
  name: { fontWeight: "600", color: colors.ink },
  muted: { color: colors.muted, fontSize: 12, marginTop: 4 }
});
