import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import Svg, {
  Path,
} from "react-native-svg";

import {
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import DashboardMap from "@/components/DashboardMap";

type SensorStatus =
  | "WAITING"
  | "SAFE"
  | "WARNING"
  | "DANGER";

type Coordinate = {
  latitude: number;
  longitude: number;
};

/* =========================================================
   SENSOR LOGIC
========================================================= */

const getStatus = (
  distance: number | null
): SensorStatus => {
  if (distance === null) {
    return "WAITING";
  }

  if (distance <= 1) {
    return "DANGER";
  }

  if (distance <= 3) {
    return "WARNING";
  }

  return "SAFE";
};

const getStatusColor = (
  status: SensorStatus,
  dark: boolean
) => {
  switch (status) {
    case "DANGER":
      return "#FF453A";

    case "WARNING":
      return "#FF9F0A";

    case "SAFE":
      return "#30D158";

    default:
      return dark
        ? "#229BFF"
        : "#0878D1";
  }
};

/* =========================================================
   FRONT RADAR
========================================================= */

function FrontRadar({
  dark,
}: {
  dark: boolean;
}) {
  const blue = dark
    ? "#229BFF"
    : "#0878D1";

  return (
    <View style={styles.radarContainer}>
      <Svg
        width="100%"
        height={80}
        viewBox="0 0 280 150"
      >
        <Path
          d="M25 120 Q140 5 255 120"
          fill="none"
          stroke={blue}
          strokeWidth="2"
          opacity={0.95}
        />

        <Path
          d="M55 120 Q140 35 225 120"
          fill="none"
          stroke={blue}
          strokeWidth="2"
          opacity={0.75}
        />

        <Path
          d="M88 120 Q140 65 192 120"
          fill="none"
          stroke={blue}
          strokeWidth="2"
          opacity={0.6}
        />
      </Svg>

      <View
        style={[
          styles.radarCenterLine,
          {
            backgroundColor: `${blue}25`,
          },
        ]}
      />
    </View>
  );
}

/* =========================================================
   REAR RADAR
========================================================= */

function RearRadar({
  dark,
}: {
  dark: boolean;
}) {
  const orange = "#FF9F0A";

  return (
    <View style={styles.radarContainer}>
      <Svg
        width="100%"
        height={80}
        viewBox="0 0 280 150"
      >
        <Path
          d="M25 30 Q140 145 255 30"
          fill="none"
          stroke={orange}
          strokeWidth="2"
          opacity={0.95}
        />

        <Path
          d="M55 30 Q140 115 225 30"
          fill="none"
          stroke={orange}
          strokeWidth="2"
          opacity={0.75}
        />

        <Path
          d="M88 30 Q140 85 192 30"
          fill="none"
          stroke={orange}
          strokeWidth="2"
          opacity={0.6}
        />
      </Svg>

      <View
        style={[
          styles.radarCenterLine,
          {
            backgroundColor: `${orange}20`,
          },
        ]}
      />
    </View>
  );
}

/* =========================================================
   SENSOR CARD
========================================================= */

function SensorCard({
  label,
  distance,
  status,
  dark,
}: {
  label: string;
  distance: number | null;
  status: SensorStatus;
  dark: boolean;
}) {
  const color = getStatusColor(
    status,
    dark
  );

  return (
    <View
      style={[
        styles.sensorCard,
        {
          backgroundColor: dark
            ? "#07121F"
            : "#F7FAFE",

          borderColor: `${color}90`,

          shadowColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.sensorLabel,
          {
            color: dark
              ? "#C4D1E1"
              : "#24364D",
          },
        ]}
      >
        {label}
      </Text>

      <View style={styles.distanceRow}>
        <Text
          style={[
            styles.distanceText,
            {
              color,
            },
          ]}
        >
          {distance === null
            ? "--"
            : distance.toFixed(1)}
        </Text>

        <Text
          style={[
            styles.unitText,
            {
              color: dark
                ? "#A9BBD0"
                : "#52677F",
            },
          ]}
        >
          m
        </Text>
      </View>

      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor: `${color}18`,
          },
        ]}
      >
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: color,
              position: "absolute",
              right: 18,
            },
          ]}
        />

        <Text
          style={[
            styles.statusText,
            {
              color,
            },
          ]}
        >
          {status}
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   LIVE ALERT CARD
========================================================= */

function AlertCard({
  icon,
  label,
  color,
  dark,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  color: string;
  dark: boolean;
}) {
  return (
    <View
      style={[
        styles.alertCard,
        {
          backgroundColor: dark
            ? "#07121F"
            : "#FFFFFF",

          borderColor: dark
            ? "#18324B"
            : "#D9E3EF",
        },
      ]}
    >
      <View
        style={[
          styles.alertIconCircle,
          {
            backgroundColor: `${color}12`,
            borderColor: `${color}55`,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={22}
          color={color}
        />
      </View>

      <Text
        style={[
          styles.alertLabel,
          {
            color: dark
              ? "#E5EDF7"
              : "#24364D",
          },
        ]}
      >
        {label}
      </Text>

      <View
        style={[
          styles.alertIndicator,
          {
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}


/* =========================================================
   RIGHT-SIDE STATUS CARD
========================================================= */

function StatusCard({
  icon,
  title,
  value,
  color,
  dark,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  title: string;
  value: string;
  color: string;
  dark: boolean;
}) {
  return (
    <View
      style={[
        styles.statusCard,
        {
          backgroundColor: dark ? "#07121F" : "#F7FAFE",
          borderColor: dark ? "#18324B" : "#D9E3EF",
        },
      ]}
    >
      <View
        style={[
          styles.statusIcon,
          {
            backgroundColor: `${color}12`,
            borderColor: `${color}55`,
          },
        ]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={30}
          color={color}
        />
      </View>

      <View style={styles.statusTextBlock}>
        <Text
          style={[
            styles.statusTitle,
            { color: dark ? "#EAF2FC" : "#203247" },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.statusValue,
            { color: dark ? "#8FA6BE" : "#60758D" },
          ]}
          numberOfLines={2}
        >
          {value}
        </Text>
      </View>

      <View
        style={[
          styles.statusDot,
          { backgroundColor: color },
        ]}
      />
    </View>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function Dashboard() {
  const { width } =
    useWindowDimensions();

  const isDesktop =
    width >= 850;

  /*
   * Theme
   */

  const [darkMode, setDarkMode] =
    useState(true);

  /*
   * Navigation popup
   */

  const [
    showNavigation,
    setShowNavigation,
  ] = useState(false);

  /*
   * Temporary sensor values.
   *
   * Keep null until the real
   * Arduino / Raspberry Pi values
   * are connected.
   */

  const frontDistance:
    | number
    | null = null;

  const rearDistance:
    | number
    | null = null;

  const frontStatus =
    getStatus(frontDistance);

  const rearStatus =
    getStatus(rearDistance);

  /*
   * Theme object
   */

  const theme = useMemo(
    () => ({
      background: darkMode
        ? "#02060D"
        : "#F4F7FB",

      panel: darkMode
        ? "#050D17"
        : "#FFFFFF",

      panelSecondary: darkMode
        ? "#07121F"
        : "#F7FAFE",

      border: darkMode
        ? "#18314A"
        : "#D7E1EC",

      text: darkMode
        ? "#FFFFFF"
        : "#142235",

      secondaryText: darkMode
        ? "#7B91AD"
        : "#60758D",

      muted: darkMode
        ? "#91A4BD"
        : "#65788D",
    }),
    [darkMode]
  );

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          isDesktop &&
            styles.desktopContent,
        ]}
        showsVerticalScrollIndicator={
          false
        }
      >
        {/* =================================================
            TOP BAR
        ================================================= */}

        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <MaterialCommunityIcons
              name="waveform"
              size={27}
              color="#229BFF"
            />

            <Text
              style={[
                styles.brandText,
                {
                  color: darkMode
                    ? "#9CB3CC"
                    : "#54708D",
                },
              ]}
            >
              MOTOSENSEAI
            </Text>
          </View>

          <View
            style={styles.topActions}
          >
            {/* CAMERA */}

            <Pressable
              style={[
                styles.topIconButton,
                {
                  backgroundColor:
                    darkMode
                      ? "#061323"
                      : "#FFFFFF",

                  borderColor:
                    darkMode
                      ? "#155A91"
                      : "#BFD3E7",
                },
              ]}
            >
              <MaterialCommunityIcons
                name="camera-outline"
                size={22}
                color="#229BFF"
              />
            </Pressable>

            {/* THEME */}

            <Pressable
              onPress={() =>
                setDarkMode(
                  (value) => !value
                )
              }
              style={[
                styles.topIconButton,
                {
                  backgroundColor:
                    darkMode
                      ? "#061323"
                      : "#FFFFFF",

                  borderColor:
                    darkMode
                      ? "#155A91"
                      : "#BFD3E7",
                },
              ]}
            >
              <MaterialCommunityIcons
                name={
                  darkMode
                    ? "white-balance-sunny"
                    : "moon-waning-crescent"
                }
                size={21}
                color={
                  darkMode
                    ? "#FFD166"
                    : "#315A80"
                }
              />
            </Pressable>
          </View>
        </View>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <View
          style={[
            styles.mainGrid,
            !isDesktop &&
              styles.mobileGrid,
          ]}
        >
          {/* =================================================
              LEFT — LIVE RIDE
          ================================================= */}

          <View
            style={[
              styles.liveRidePanel,
              {
                backgroundColor:
                  theme.panel,

                borderColor:
                  theme.border,
              },
            ]}
          >
            <View
              style={styles.liveHeader}
            >
              <View>
                <Text
                  style={[
                    styles.liveTitle,
                    {
                      color:
                        theme.text,
                    },
                  ]}
                >
                  Live Ride
                </Text>

                <Text
                  style={[
                    styles.liveSubtitle,
                    {
                      color:
                        theme.secondaryText,
                    },
                  ]}
                >
                  Front & rear proximity
                  monitoring
                </Text>
              </View>

              <View
                style={styles.liveBadge}
              >
                <View
                  style={styles.liveDot}
                />

                <Text
                  style={styles.liveText}
                >
                  LIVE
                </Text>
              </View>
            </View>

            {/* =================================================
                LIVE RIDE CONTENT

                The alert cards sit beside the bike/radar area
                on desktop, matching the reference design.
                On smaller screens they move below the ride area.
            ================================================= */}

            <View
              style={[
                styles.rideContentRow,
                !isDesktop &&
                  styles.mobileRideContentRow,
              ]}
            >
              <View style={styles.rideVisualColumn}>

                {/* FRONT SENSOR */}

                <SensorCard
                  label="FRONT SENSOR"
                  distance={
                    frontDistance
                  }
                  status={
                    frontStatus
                  }
                  dark={darkMode}
                />

                {/* FRONT RADAR */}

                <FrontRadar
                  dark={darkMode}
                />

                {/* BIKE + GREEN RINGS */}

                <View
                  style={styles.bikeArea}
                >
                  <View
                    style={[
                      styles.greenRing,
                      styles.greenOuter,
                      {
                        borderColor:
                          darkMode
                            ? "#00E67635"
                            : "#00A95745",
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.greenRing,
                      styles.greenMiddle,
                      {
                        borderColor:
                          darkMode
                            ? "#00E67630"
                            : "#00A95738",
                      },
                    ]}
                  />

                  <View
                    style={[
                      styles.greenRing,
                      styles.greenInner,
                      {
                        borderColor:
                          darkMode
                            ? "#00E67628"
                            : "#00A95732",

                        backgroundColor:
                          darkMode
                            ? "#00E67606"
                            : "#00A95704",
                      },
                    ]}
                  />

                  <Image
                    source={require("../../assets/images/bike-live-ride.png")}
                    style={
                      styles.bikeImage
                    }
                    resizeMode="contain"
                  />
                </View>

                {/* REAR RADAR */}

                <RearRadar
                  dark={darkMode}
                />

                {/* REAR SENSOR */}

                <SensorCard
                  label="REAR SENSOR"
                  distance={
                    rearDistance
                  }
                  status={
                    rearStatus
                  }
                  dark={darkMode}
                />
              </View>

              {/* ALERTS BESIDE THE BIKE */}

              <View
                style={[
                  styles.alertStack,
                  !isDesktop &&
                    styles.mobileAlertStack,
                ]}
              >
                <AlertCard
                  icon="motorbike"
                  label="Crash Detection"
                  color="#FF453A"
                  dark={darkMode}
                />

                <AlertCard
                  icon="motorbike"
                  label="Front Proximity"
                  color="#FF9F0A"
                  dark={darkMode}
                />

                <AlertCard
                  icon="motorbike"
                  label="Rear Proximity"
                  color="#FF9F0A"
                  dark={darkMode}
                />

                <AlertCard
                  icon="alert-circle-outline"
                  label="SOS Emergency Alert"
                  color="#FF453A"
                  dark={darkMode}
                />
              </View>
            </View>
          </View>

          {/* =================================================
              RIGHT — LIVE ALERTS
          ================================================= */}

          <View
            style={[
              styles.alertPanel,
              {
                backgroundColor: theme.panel,
                borderColor: theme.border,
              },
            ]}
          >
            <View style={styles.rightHeader}>
              <Text
                style={[
                  styles.alertTitle,
                  { color: theme.text },
                ]}
              >
                Live Alerts
              </Text>
            </View>

            {/* =================================================
                RESERVED AREA

                CLOSED:
                SAFE / WARNING / SOS / RIDE STATUS

                OPEN:
                REAL DASHBOARD MAP
            ================================================= */}

            <View style={styles.navigationSpace}>
  {!showNavigation ? (
    <View style={styles.statusStack}>

      {/* SAFE */}
      <StatusCard
        icon="shield-check-outline"
        title="SAFE"
        value={
          frontStatus === "DANGER" || rearStatus === "DANGER"
            ? "Immediate danger detected"
            : frontStatus === "WARNING" || rearStatus === "WARNING"
              ? "Object detected nearby"
              : "All systems clear"
        }
        color="#30D158"
        dark={darkMode}
      />

      {/* RIDE STATUS */}
      <StatusCard
        icon="speedometer"
        title="RIDE STATUS"
        value="Speed: 0 km/h  •  Idle"
        color="#229BFF"
        dark={darkMode}
      />

      {/* WEATHER STATUS */}
      <StatusCard
        icon="weather-partly-cloudy"
        title="WEATHER STATUS"
        value="Clear Sky  •  28°C"
        color="#4D7CFF"
        dark={darkMode}
      />

    </View>
  ) : (
    <View
      style={[
        styles.mapPopup,
        {
          backgroundColor: darkMode
            ? "#071321"
            : "#F7FAFE",
          borderColor: darkMode
            ? "#229BFF55"
            : "#BFD3E7",
        },
      ]}
    >
      <DashboardMap />

      {/* LIVE NAVIGATION LABEL */}
      <View style={styles.mapLabel}>
        <MaterialCommunityIcons
          name="navigation-variant"
          size={14}
          color="#229BFF"
        />

        <Text style={styles.mapLabelText}>
          LIVE NAVIGATION
        </Text>
      </View>

      {/* MAP CLOSE BUTTON */}
      <Pressable
        style={styles.mapCloseButton}
        onPress={() => setShowNavigation(false)}
      >
        <MaterialCommunityIcons
          name="close"
          size={19}
          color="#FFFFFF"
        />
      </Pressable>
    </View>
  )}
</View>

            {/* =================================================
                NAVIGATION + CAMERA — ALWAYS AT BOTTOM
            ================================================= */}

            <View style={styles.bottomControls}>
              <View style={styles.controlRow}>
                <Pressable
                  style={[
                    styles.controlButton,
                    {
                      backgroundColor: darkMode
                        ? "#061323"
                        : "#F7FAFE",
                      borderColor: darkMode
                        ? "#173A5A"
                        : "#C8D8E8",
                    },
                    showNavigation &&
                      styles.controlButtonActive,
                  ]}
                  onPress={() => setShowNavigation(true)}
                >
                  <MaterialCommunityIcons
                    name="navigation-variant"
                    size={21}
                    color="#229BFF"
                  />

                  <Text
                    style={[
                      styles.controlText,
                      { color: theme.text },
                    ]}
                  >
                    Navigation
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.controlButton,
                    {
                      backgroundColor: darkMode
                        ? "#061323"
                        : "#F7FAFE",
                      borderColor: darkMode
                        ? "#173A5A"
                        : "#C8D8E8",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="camera-outline"
                    size={22}
                    color="#229BFF"
                  />

                  <Text
                    style={[
                      styles.controlText,
                      { color: theme.text },
                    ]}
                  >
                    Camera
                  </Text>
                </Pressable>
              </View>

              {showNavigation && (
                <Pressable
                  style={[
                    styles.closeButton,
                    {
                      backgroundColor: darkMode
                        ? "#13080A"
                        : "#FFF8F8",
                      borderColor: darkMode
                        ? "#FF453A"
                        : "#FF7770",
                    },
                  ]}
                  onPress={() => setShowNavigation(false)}
                >
                  <MaterialCommunityIcons
                    name="close"
                    size={20}
                    color="#FF453A"
                  />

                  <Text style={styles.closeText}>
                    Close Navigation & Camera
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  /* =======================================================
     SCREEN
  ======================================================= */

  safeArea: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    paddingBottom: 35,
  },

  desktopContent: {
    minHeight: "100%",
  },

  /* =======================================================
     TOP BAR
  ======================================================= */

  topBar: {
    width: "100%",

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 18,
  },

  brandRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  brandText: {
    marginLeft: 9,

    fontSize: 16,

    fontWeight: "800",

    letterSpacing: 2.2,
  },

  topActions: {
    flexDirection: "row",

    gap: 10,
  },

  topIconButton: {
    width: 46,

    height: 46,

    borderRadius: 14,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  /* =======================================================
     MAIN GRID
  ======================================================= */

  mainGrid: {
    width: "100%",

    flexDirection: "row",

    gap: 24,

    alignItems: "stretch",
  },

  mobileGrid: {
    flexDirection: "column",
  },

  mobileRideContentRow: {
    flexDirection: "column",
  },

  /* =======================================================
     LIVE RIDE PANEL
  ======================================================= */

  liveRidePanel: {
    flex: 1.15,

    minHeight: 680,

    borderRadius: 20,

    borderWidth: 1,

    padding: 26,

    overflow: "hidden",
  },

  liveHeader: {
    flexDirection: "row",

    alignItems: "flex-start",

    justifyContent: "space-between",

    marginBottom: 20,
  },

  liveTitle: {
    fontSize: 36,

    lineHeight: 40,

    fontWeight: "800",

    letterSpacing: -1.4,
  },

  liveSubtitle: {
    fontSize: 16,

    marginTop: 4,
  },

  /* =======================================================
     LIVE BADGE
  ======================================================= */

  liveBadge: {
    height: 42,

    paddingHorizontal: 16,

    borderRadius: 22,

    borderWidth: 1,

    borderColor: "#00D87875",

    backgroundColor: "#00D87814",

    flexDirection: "row",

    alignItems: "center",
  },

  liveDot: {
    width: 9,

    height: 9,

    borderRadius: 5,

    backgroundColor: "#00E676",

    marginRight: 7,
  },

  liveText: {
    color: "#00E676",

    fontSize: 13,

    fontWeight: "800",

    letterSpacing: 1,
  },

  /* =======================================================
     SENSOR CARD
  ======================================================= */

  sensorCard: {
    width: "62%",

    minWidth: 260,

    alignSelf: "center",

    height: 130,

    borderRadius: 20,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",

    shadowOpacity: 0.22,

    shadowRadius: 14,

    elevation: 5,
  },

  sensorLabel: {
    fontSize: 18,

    fontWeight: "800",

    letterSpacing: 1.5,
  },

  distanceRow: {
    flexDirection: "row",

    alignItems: "baseline",

    marginTop: 4,
  },

  distanceText: {
    fontSize: 28,

    fontWeight: "800",
  },

  unitText: {
    fontSize: 17,

    fontWeight: "700",

    marginLeft: 4,
  },

  statusBadge: {
    marginTop: 7,

    paddingHorizontal: 13,

    paddingVertical: 6,

    borderRadius: 16,

    flexDirection: "row",

    alignItems: "center",
  },

  statusDot: {
    width: 7,

    height: 7,

    borderRadius: 4,

    marginRight: 6,
  },

  statusText: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 0.8,
  },

  /* =======================================================
     RADAR
  ======================================================= */

  radarContainer: {
    width: "72%",

    maxWidth: 320,

    height: 82,

    alignSelf: "center",

    alignItems: "center",

    justifyContent: "center",

    position: "relative",

    marginVertical: 3,
  },

  radarCenterLine: {
    position: "absolute",

    width: 1,

    height: 65,

    top: 7,
  },

  /* =======================================================
     BIKE
  ======================================================= */

  bikeArea: {
    width: "100%",

    height: 285,

    alignItems: "center",

    justifyContent: "center",

    position: "relative",

    marginVertical: 2,
  },

  bikeImage: {
    width: 175,

    height: 270,

    zIndex: 10,
  },

  /* =======================================================
     GREEN DETECTION RINGS
  ======================================================= */

  greenRing: {
    position: "absolute",

    borderRadius: 999,
  },

  greenOuter: {
    width: 265,

    height: 265,

    borderWidth: 1,
  },

  greenMiddle: {
    width: 205,

    height: 205,

    borderWidth: 1,
  },

  greenInner: {
    width: 145,

    height: 145,

    borderWidth: 1,
  },

  /* =======================================================
     ALERT PANEL
  ======================================================= */

  alertPanel: {
    flex: 1,
    minHeight: 680,
    borderRadius: 20,
    borderWidth: 1,
    padding: 26,
    overflow: "hidden",
  },

  rightHeader: {
    width: "100%",
    marginBottom: 14,
  },

  /* =======================================================
     RIDE + ALERT STACK
  ======================================================= */

  rideContentRow: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    gap: 18,
  },

  rideVisualColumn: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    minWidth: 0,
  },

  alertStack: {
    width: 150,

    alignSelf: "stretch",

    justifyContent: "space-between",

    paddingVertical: 4,
  },

  mobileAlertStack: {
    width: "100%",

    flexDirection: "column",

    gap: 10,

    alignSelf: "auto",
  },

  alertTitle: {
    fontSize: 36,

    lineHeight: 40,

    fontWeight: "800",

    letterSpacing: -1.2,

    marginBottom: 24,
  },

  /* =======================================================
     ALERT GRID
  ======================================================= */

  alertGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 14,
  },

  alertCard: {
    width: "100%",

    minHeight: 145,

    borderRadius: 16,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 8,

    paddingVertical: 12,
  },

  alertIconCircle: {
    width: 54,

    height: 54,

    borderRadius: 27,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 12,
  },

  alertLabel: {
    fontSize: 13,

    fontWeight: "700",

    textAlign: "center",

    lineHeight: 18,
  },

  alertIndicator: {
    width: 8,

    height: 8,

    borderRadius: 5,

    marginTop: 12,
  },

  /* =======================================================
     DIVIDER
  ======================================================= */

  divider: {
    width: "100%",

    height: 1,

    marginVertical: 25,
  },

  /* =======================================================
     RESERVED NAVIGATION SPACE

     IMPORTANT:

     This space exists even when the map
     is closed.

     The map is mounted only when
     showNavigation === true.
  ======================================================= */

  navigationSpace: {
    width: "100%",
    flex: 1,
    minHeight: 390,
    marginBottom: 14,
    position: "relative",
  },

  statusStack: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    gap: 14,
  },

  statusCard: {
  flex: 1,
  minHeight: 100,
  borderRadius: 18,
  borderWidth: 1,
  paddingHorizontal: 20,
  paddingVertical: 14,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
},

  statusIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  statusTextBlock: {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
},

  statusTitle: {
  fontSize: 24,
  fontWeight: "800",
  letterSpacing: 0.8,
  textAlign: "center",
},

statusValue: {
  fontSize: 16,
  marginTop: 5,
  lineHeight: 21,
  textAlign: "center",
},

  /* =======================================================
     MAP POPUP
  ======================================================= */

  mapPopup: {
    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    bottom: 0,

    borderRadius: 18,

    borderWidth: 1,

    overflow: "hidden",

    elevation: 12,

    shadowOpacity: 0.25,

    shadowRadius: 15,
  },

  nativeMap: {
    flex: 1,
  },

  webMap: {
    flex: 1,

    backgroundColor: "#071321",

    alignItems: "center",

    justifyContent: "center",
  },

  mapEmptyState: {
    alignItems: "center",

    justifyContent: "center",

    padding: 20,
  },

  mapEmptyTitle: {
    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "800",

    marginTop: 8,
  },

  mapEmptyText: {
    color: "#71859A",

    fontSize: 11,

    marginTop: 4,

    textAlign: "center",
  },

  coordinatesText: {
    color: "#229BFF",

    fontSize: 10,

    marginTop: 8,
  },

  /* =======================================================
     MAP CLOSE
  ======================================================= */

  mapCloseButton: {
    position: "absolute",

    top: 10,

    right: 10,

    width: 34,

    height: 34,

    borderRadius: 17,

    backgroundColor:
      "rgba(0,0,0,0.72)",

    alignItems: "center",

    justifyContent: "center",
  },

  /* =======================================================
     MAP LABEL
  ======================================================= */

  mapLabel: {
    position: "absolute",

    left: 10,

    top: 10,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 9,

    paddingVertical: 6,

    borderRadius: 10,

    backgroundColor:
      "rgba(0,0,0,0.72)",
  },

  mapLabelText: {
    color: "#FFFFFF",

    fontSize: 9,

    fontWeight: "800",

    letterSpacing: 0.8,

    marginLeft: 5,
  },

  /* =======================================================
     RIDER MARKER
  ======================================================= */

  riderMarker: {
    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor:
      "rgba(22,139,255,0.25)",

    borderWidth: 2,

    borderColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",
  },

  riderDot: {
    width: 10,

    height: 10,

    borderRadius: 5,

    backgroundColor: "#168BFF",
  },

  /* =======================================================
     MAP LOADING
  ======================================================= */

  mapLoading: {
    position: "absolute",

    top: 12,

    left: 12,

    paddingHorizontal: 10,

    paddingVertical: 7,

    borderRadius: 10,

    backgroundColor:
      "rgba(5,15,27,0.9)",
  },

  mapLoadingText: {
    color: "#FFFFFF",

    fontSize: 10,
  },

  /* =======================================================
     CONTROL BUTTONS
  ======================================================= */

  bottomControls: {
    width: "100%",
    marginTop: "auto",
  },

  controlRow: {
    flexDirection: "row",
    gap: 12,
  },

  controlButton: {
    flex: 1,
    minHeight: 60,
    borderRadius: 15,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 9,
  },

  controlButtonActive: {
    borderColor: "#229BFF75",

    backgroundColor: "#081A2C",
  },

  controlText: {
    fontSize: 14,

    fontWeight: "700",
  },

  /* =======================================================
     CLOSE BUTTON
  ======================================================= */

  closeButton: {
    width: "100%",

    minHeight: 58,

    borderRadius: 16,

    borderWidth: 1,

    marginTop: 12,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 9,
  },

  closeText: {
    color: "#FF453A",

    fontSize: 13,

    fontWeight: "800",
  },
});