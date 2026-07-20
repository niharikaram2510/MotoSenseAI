import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>

        <Text style={styles.title}>MotoSense AI</Text>

        <View style={styles.dateRow}>
          <Text style={styles.date}>Monday, 20 July</Text>
          <Text style={styles.time}>08:42 PM</Text>
        </View>

        <View style={styles.statusContainer}>
          <View style={styles.badge}>
            <View style={styles.dot} />
            <Text style={styles.badgeText}>CONNECTED</Text>
          </View>

          <Text style={styles.statusText}>
            All Systems Operational
          </Text>
        </View>

        <View style={styles.divider} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#08111F",
    paddingHorizontal: 24,
    paddingTop: 18,
  },

  header: {
    marginTop: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 36,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  dateRow: {
    marginTop: 26,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    color: "#8D99AE",
    fontSize: 15,
    fontWeight: "500",
  },

  time: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },

  statusContainer: {
    marginTop: 28,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#102B1E",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#34D399",
    marginRight: 8,
  },

  badgeText: {
    color: "#34D399",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "600",
    marginTop: 16,
    lineHeight: 30,
  },

  divider: {
    height: 1,
    backgroundColor: "#1C2A3A",
    marginTop: 32,
  },
});