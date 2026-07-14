import { ScrollView, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme/colors";

/**
 * Mobile equivalent of the admin "Shipment track" dashboard: the same
 * data (distance/eta, route optimization, truck capacity, route
 * efficiency) reflowed for a single-column phone layout.
 */
export function DashboardScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: 20, gap: 16 }}>
      <View>
        <Text style={styles.eyebrow}>Welcome back,</Text>
        <Text style={styles.title}>Alex</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Distance to arrival</Text>
        <Text style={styles.bigRed}>120 km / 1h 50min</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Traffic and route optimization</Text>
        <Text style={styles.bigRed}>85%</Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: "85%" }]} />
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: colors.red }]}>
        <Text style={[styles.cardLabel, { color: "#fff" }]}>Current truck capacity</Text>
        <Text style={[styles.bigRed, { color: "#fff" }]}>86%</Text>
        <Text style={{ color: "#fff", opacity: 0.85, fontSize: 12 }}>
          AL-223965406 · Max load 8,453 KG
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Route efficiency</Text>
        <Text style={styles.bigRed}>96%</Text>
        <Text style={styles.muted}>The best road</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  eyebrow: { color: colors.muted, fontSize: 12 },
  title: { color: colors.ink, fontSize: 22, fontWeight: "600" },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.line
  },
  cardLabel: { color: colors.muted, fontSize: 12, marginBottom: 6 },
  bigRed: { color: colors.red, fontSize: 24, fontWeight: "700", marginBottom: 8 },
  muted: { color: colors.muted, fontSize: 12 },
  track: { height: 4, borderRadius: 999, backgroundColor: colors.line },
  fill: { height: 4, borderRadius: 999, backgroundColor: colors.red }
});
