import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />

      {/* ================= HEADER ================= */}

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
            height: insets.top + 78,
          },
        ]}
      >
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Image
              source={require('@/assets/images/motosense-logo-full.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.brandNameContainer}>
            <Text style={styles.brandName}>MOTOSENSE</Text>
            <Text style={styles.aiA}>A</Text>
            <Text style={styles.aiI}>I</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.75}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color="#F6F8FC"
          />

          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* ================= HOME CONTENT ================= */}

      <View style={styles.content}>

        {/* ================= GREETING ================= */}

        <View style={styles.greeting}>
          <Text style={styles.greetingTitle}>
            Good evening.
          </Text>

          <Text style={styles.greetingSubtitle}>
            Here's how your ride is looking today.
          </Text>
        </View>

        {/* ================= SYSTEM STATUS ================= */}

        <View style={styles.statusCard}>

          <View style={styles.statusIndicatorContainer}>
            <View style={styles.statusGlow}>
              <View style={styles.statusDot} />
            </View>
          </View>

          <View style={styles.statusTextContainer}>

            <Text style={styles.statusLabel}>
              SYSTEM STATUS
            </Text>

            <Text style={styles.statusTitle}>
              ALL SYSTEMS OPERATIONAL
            </Text>

            <Text style={styles.statusDescription}>
              Your bike and safety system are functioning normally.
            </Text>

          </View>

        </View>

        {/* ================= TODAY'S RIDE ================= */}

        <TouchableOpacity
          style={styles.rideCard}
          activeOpacity={0.8}
        >

          <View style={styles.cardHeader}>

            <Text style={styles.cardLabel}>
              TODAY'S RIDE
            </Text>

            <Ionicons
              name="chevron-forward"
              size={19}
              color="#7D8799"
            />

          </View>

          {/* RIDE METRICS */}

          <View style={styles.metricsRow}>

            {/* DISTANCE */}

            <View style={styles.metricBlock}>

              <View style={styles.metricTopRow}>

                <View style={styles.distanceIcon}>
                  <Ionicons
                    name="navigate-outline"
                    size={19}
                    color="#00E5FF"
                  />
                </View>

                <Text style={styles.metricValue}>
                  12.4
                </Text>

                <Text style={styles.metricUnit}>
                  km
                </Text>

              </View>

              <Text style={styles.metricLabel}>
                DISTANCE
              </Text>

            </View>

            <View style={styles.metricDivider} />

            {/* RIDE TIME */}

            <View style={styles.metricBlock}>

              <View style={styles.metricTopRow}>

                <View style={styles.timeIcon}>
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color="#9B5CFF"
                  />
                </View>

                <Text style={styles.metricValue}>
                  34
                </Text>

                <Text style={styles.metricUnit}>
                  min
                </Text>

              </View>

              <Text style={styles.metricLabel}>
                RIDE TIME
              </Text>

            </View>

          </View>

          {/* SAFETY SUMMARY */}

          <View style={styles.safetySummary}>

            <View style={styles.safetyIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color="#00FF9D"
              />
            </View>

            <View style={styles.safetyTextContainer}>

              <Text style={styles.safetyCount}>
                2
              </Text>

              <Text style={styles.safetyDescription}>
                safety events today
              </Text>

            </View>

          </View>

        </TouchableOpacity>

        {/* ================= AI RIDER INSIGHT ================= */}

        <TouchableOpacity
          style={styles.aiCard}
          activeOpacity={0.8}
        >

          <View style={styles.aiAccent} />

          <View style={styles.aiInner}>

            <View style={styles.aiHeader}>

              <View style={styles.aiTitleSection}>

                <View style={styles.aiIcon}>
                  <Ionicons
                    name="sparkles"
                    size={19}
                    color="#9B5CFF"
                  />
                </View>

                <View>

                  <Text style={styles.aiLabel}>
                    AI RIDER INSIGHT
                  </Text>

                  <Text style={styles.aiTimestamp}>
                    JUST NOW
                  </Text>

                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color="#7D8799"
              />

            </View>

            <Text style={styles.aiMessage}>
              Smooth riding detected today.
            </Text>

            <View style={styles.aiFooter}>

              <Text style={styles.aiSource}>
                Based on your riding pattern today
              </Text>

              <Ionicons
                name="arrow-forward"
                size={19}
                color="#9B5CFF"
              />

            </View>

          </View>

        </TouchableOpacity>

      </View>

      {/* ================= BOTTOM NAVBAR ================= */}

      <View
        style={[
          styles.bottomNav,
          {
            paddingBottom: Math.max(insets.bottom, 12),
          },
        ]}
      >

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons
            name="home"
            size={24}
            color="#F6F8FC"
          />

          <Text style={[styles.navLabel, styles.navLabelActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons
            name="bar-chart-outline"
            size={24}
            color="#7D8799"
          />

          <Text style={styles.navLabel}>
            Dashboard
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#7D8799"
          />

          <Text style={styles.navLabel}>
            Alerts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.7}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color="#7D8799"
          />

          <Text style={styles.navLabel}>
            Settings
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* ================= SCREEN ================= */

  screen: {
    flex: 1,
    backgroundColor: '#0A0F1A',
  },

  /* ================= HEADER ================= */

  header: {
    width: '100%',
    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: '#0A0F1A',
  },

  brandSection: {
    flexDirection: 'row',
    alignItems: 'center',

    flex: 1,
    minWidth: 0,
  },

  logoContainer: {
    width: 52,
    height: 52,

    borderRadius: 16,
    overflow: 'hidden',

    backgroundColor: '#131824',

    borderWidth: 1,
    borderColor: '#1C2333',
  },

  logo: {
    width: '100%',
    height: '100%',
  },

  brandNameContainer: {
    marginLeft: 12,

    flexDirection: 'row',
    alignItems: 'center',

    flexShrink: 1,
  },

  brandName: {
    color: '#FFFFFF',

    fontSize: 19,
    fontWeight: '800',

    letterSpacing: 0.3,
  },

  aiA: {
    color: '#7C3AED',

    fontSize: 19,
    fontWeight: '900',

    letterSpacing: -1,
    marginLeft: 4,
  },

  aiI: {
    color: '#00E5FF',

    fontSize: 19,
    fontWeight: '900',

    letterSpacing: -1,
  },

  notificationButton: {
    width: 46,
    height: 46,

    marginLeft: 12,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#131824',

    borderWidth: 1,
    borderColor: '#1C2333',

    position: 'relative',
  },

  notificationDot: {
    position: 'absolute',

    width: 7,
    height: 7,

    borderRadius: 4,

    backgroundColor: '#00E5FF',

    top: 7,
    right: 7,

    borderWidth: 1,
    borderColor: '#131824',
  },

  /* ================= CONTENT ================= */

  content: {
    width: '100%',

    paddingHorizontal: 16,
    paddingTop: 20,

    paddingBottom: 110,
  },

  /* ================= GREETING ================= */

  greeting: {
    marginBottom: 20,
  },

  greetingTitle: {
    color: '#F6F8FC',

    fontSize: 22,
    fontWeight: '700',
  },

  greetingSubtitle: {
    color: '#8E9AAF',

    fontSize: 14,

    marginTop: 4,

    lineHeight: 20,
  },

  /* ================= SYSTEM STATUS ================= */

  statusCard: {
    width: '100%',

    paddingHorizontal: 16,
    paddingVertical: 16,

    flexDirection: 'row',
    alignItems: 'center',

    backgroundColor: '#131824',

    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#1C2333',
  },

  statusIndicatorContainer: {
    width: 44,
    height: 44,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 14,
  },

  statusGlow: {
    width: 40,
    height: 40,

    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 255, 157, 0.08)',
  },

  statusDot: {
    width: 9,
    height: 9,

    borderRadius: 5,

    backgroundColor: '#00FF9D',
  },

  statusTextContainer: {
    flex: 1,
  },

  statusLabel: {
    color: '#A0AABD',

    fontSize: 11,
    fontWeight: '700',

    letterSpacing: 1,

    marginBottom: 4,
  },

  statusTitle: {
    color: '#F6F8FC',

    fontSize: 15,
    fontWeight: '800',

    marginBottom: 4,
  },

  statusDescription: {
    color: '#8E9AAF',

    fontSize: 12,

    lineHeight: 17,
  },

  /* ================= TODAY'S RIDE ================= */

  rideCard: {
    width: '100%',

    marginTop: 16,

    padding: 18,

    backgroundColor: '#131824',

    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#1C2333',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 18,
  },

  cardLabel: {
    color: '#A0AABD',

    fontSize: 11,
    fontWeight: '700',

    letterSpacing: 1,
  },

  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  metricBlock: {
    flex: 1,
  },

  metricTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  distanceIcon: {
    width: 38,
    height: 38,

    borderRadius: 11,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 229, 255, 0.09)',

    marginRight: 10,
  },

  timeIcon: {
    width: 38,
    height: 38,

    borderRadius: 11,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(124, 58, 237, 0.11)',

    marginRight: 10,
  },

  metricValue: {
    color: '#F6F8FC',

    fontSize: 24,
    fontWeight: '800',

    letterSpacing: -0.5,
  },

  metricUnit: {
    color: '#8E9AAF',

    fontSize: 12,
    fontWeight: '600',

    marginLeft: 3,
  },

  metricLabel: {
    color: '#7D8799',

    fontSize: 10,
    fontWeight: '700',

    letterSpacing: 0.8,

    marginTop: 6,
  },

  metricDivider: {
    width: 1,
    height: 40,

    backgroundColor: '#1C2333',

    marginHorizontal: 8,
  },

  safetySummary: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 18,

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: '#1C2333',
  },

  safetyIcon: {
    width: 32,
    height: 32,

    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(0, 255, 157, 0.08)',

    marginRight: 10,
  },

  safetyTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  safetyCount: {
    color: '#F6F8FC',

    fontSize: 13,
    fontWeight: '800',

    marginRight: 5,
  },

  safetyDescription: {
    color: '#8E9AAF',

    fontSize: 12,
  },

  /* ================= AI RIDER INSIGHT ================= */

  aiCard: {
    width: '100%',

    marginTop: 16,

    backgroundColor: '#131824',

    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#1C2333',

    overflow: 'hidden',
  },

  aiAccent: {
    position: 'absolute',

    left: 0,
    top: 0,
    bottom: 0,

    width: 3,

    backgroundColor: '#7C3AED',
  },

  aiInner: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 16,
  },

  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  aiTitleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  aiIcon: {
    width: 38,
    height: 38,

    borderRadius: 11,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(124, 58, 237, 0.11)',

    marginRight: 10,
  },

  aiLabel: {
    color: '#A0AABD',

    fontSize: 11,
    fontWeight: '700',

    letterSpacing: 1,
  },

  aiTimestamp: {
    color: '#6F788A',

    fontSize: 9,
    fontWeight: '600',

    letterSpacing: 1,

    marginTop: 2,
  },

  aiMessage: {
    color: '#F6F8FC',

    fontSize: 17,
    fontWeight: '700',

    lineHeight: 24,

    marginTop: 16,
    marginBottom: 16,
  },

  aiFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingTop: 14,

    borderTopWidth: 1,
    borderTopColor: '#1C2333',
  },

  aiSource: {
    color: '#7D8799',

    fontSize: 11,
    fontWeight: '500',
  },

  /* ================= BOTTOM NAVBAR ================= */

  bottomNav: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    paddingTop: 10,

    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',

    backgroundColor: '#0A0F1A',

    borderTopWidth: 1,
    borderTopColor: '#1C2333',
  },

  navItem: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  navLabel: {
    color: '#6F788A',

    fontSize: 11,
    fontWeight: '600',

    marginTop: 4,
  },

  navLabelActive: {
    color: '#F6F8FC',
    fontWeight: '700',
  },

});
