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
import { router } from 'expo-router';

import Motorcycle3D from '@/components/Motorcycle3D';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  // ================= THEME COLORS =================

  const backgroundColor = useThemeColor(
    {},
    'background'
  );

  const cardColor = useThemeColor(
    {},
    'card'
  );

  const borderColor = useThemeColor(
    {},
    'border'
  );

  const textColor = useThemeColor(
    {},
    'text'
  );

  const secondaryTextColor = useThemeColor(
    {},
    'textSecondary'
  );

  const mutedTextColor = useThemeColor(
    {},
    'textMuted'
  );

  const cyanColor = useThemeColor(
    {},
    'cyan'
  );

  const greenColor = useThemeColor(
    {},
    'green'
  );

  const purpleColor = useThemeColor(
    {},
    'tint'
  );

  // ================= NOTIFICATIONS =================

  // Temporary frontend value.
  // Later this will come from the backend.
  const unreadNotificationCount = 2;

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor,
        },
      ]}
    >
      <StatusBar
        style={
          backgroundColor === '#0A0F1A'
            ? 'light'
            : 'dark'
        }
      />

      {/* ================= HEADER ================= */}

      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
            height: insets.top + 78,
            backgroundColor,
          },
        ]}
      >
        <View style={styles.brandSection}>

          <View
            style={[
              styles.logoContainer,
              {
                backgroundColor: cardColor,
                borderColor,
              },
            ]}
          >
            <Image
              source={require('@/assets/images/motosense-logo-full.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.brandNameContainer}>
            <Text
              style={[
                styles.brandName,
                {
                  color: textColor,
                },
              ]}
            >
              MOTOSENSE
            </Text>

            <Text
              style={[
                styles.aiA,
                {
                  color: purpleColor,
                },
              ]}
            >
              A
            </Text>

            <Text
              style={[
                styles.aiI,
                {
                  color: cyanColor,
                },
              ]}
            >
              I
            </Text>
          </View>
        </View>

        {/* ================= NOTIFICATION BUTTON ================= */}

        <TouchableOpacity
          style={[
            styles.notificationButton,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
          activeOpacity={0.75}
          onPress={() =>
            router.push('/notifications')
          }
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={textColor}
          />

          {/* UNREAD COUNT BADGE */}
          {unreadNotificationCount > 0 && (
            <View
              style={[
                styles.notificationBadge,
                {
                  backgroundColor:
                    purpleColor,
                  borderColor: cardColor,
                },
              ]}
            >
              <Text
                style={
                  styles.notificationBadgeText
                }
              >
                {unreadNotificationCount > 9
                  ? '9+'
                  : unreadNotificationCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ================= HOME CONTENT ================= */}

      <View style={styles.content}>

        {/* ================= GREETING ================= */}

        <View style={styles.greeting}>
          <Text
            style={[
              styles.greetingTitle,
              {
                color: textColor,
              },
            ]}
          >
            Good evening.
          </Text>

          <Text
            style={[
              styles.greetingSubtitle,
              {
                color: secondaryTextColor,
              },
            ]}
          >
            Here's how your ride is looking today.
          </Text>
        </View>

        {/* ================= 3D MOTORCYCLE ================= */}

        <Motorcycle3D />

        {/* ================= SYSTEM STATUS ================= */}

        <View
          style={[
            styles.statusCard,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
        >

          <View
            style={
              styles.statusIndicatorContainer
            }
          >
            <View
              style={[
                styles.statusGlow,
                {
                  backgroundColor:
                    'rgba(0, 255, 157, 0.08)',
                },
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: greenColor,
                  },
                ]}
              />
            </View>
          </View>

          <View style={styles.statusTextContainer}>

            <Text
              style={[
                styles.statusLabel,
                {
                  color: mutedTextColor,
                },
              ]}
            >
              SYSTEM STATUS
            </Text>

            <Text
              style={[
                styles.statusTitle,
                {
                  color: textColor,
                },
              ]}
            >
              ALL SYSTEMS OPERATIONAL
            </Text>

            <Text
              style={[
                styles.statusDescription,
                {
                  color: secondaryTextColor,
                },
              ]}
            >
              Your bike and safety system are functioning normally.
            </Text>

          </View>

        </View>

        {/* ================= TODAY'S RIDE ================= */}

        <TouchableOpacity
          style={[
            styles.rideCard,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
          activeOpacity={0.8}
        >

          <View style={styles.cardHeader}>

            <Text
              style={[
                styles.cardLabel,
                {
                  color: mutedTextColor,
                },
              ]}
            >
              TODAY'S RIDE
            </Text>

            <Ionicons
              name="chevron-forward"
              size={19}
              color={mutedTextColor}
            />

          </View>

          {/* RIDE METRICS */}

          <View style={styles.metricsRow}>

            {/* DISTANCE */}

            <View style={styles.metricBlock}>

              <View style={styles.metricTopRow}>

                <View
                  style={[
                    styles.distanceIcon,
                    {
                      backgroundColor:
                        'rgba(0, 229, 255, 0.09)',
                    },
                  ]}
                >
                  <Ionicons
                    name="navigate-outline"
                    size={19}
                    color={cyanColor}
                  />
                </View>

                <Text
                  style={[
                    styles.metricValue,
                    {
                      color: textColor,
                    },
                  ]}
                >
                  12.4
                </Text>

                <Text
                  style={[
                    styles.metricUnit,
                    {
                      color:
                        secondaryTextColor,
                    },
                  ]}
                >
                  km
                </Text>

              </View>

              <Text
                style={[
                  styles.metricLabel,
                  {
                    color: mutedTextColor,
                  },
                ]}
              >
                DISTANCE
              </Text>

            </View>

            <View
              style={[
                styles.metricDivider,
                {
                  backgroundColor: borderColor,
                },
              ]}
            />

            {/* RIDE TIME */}

            <View style={styles.metricBlock}>

              <View style={styles.metricTopRow}>

                <View
                  style={[
                    styles.timeIcon,
                    {
                      backgroundColor:
                        'rgba(124, 58, 237, 0.11)',
                    },
                  ]}
                >
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color={purpleColor}
                  />
                </View>

                <Text
                  style={[
                    styles.metricValue,
                    {
                      color: textColor,
                    },
                  ]}
                >
                  34
                </Text>

                <Text
                  style={[
                    styles.metricUnit,
                    {
                      color:
                        secondaryTextColor,
                    },
                  ]}
                >
                  min
                </Text>

              </View>

              <Text
                style={[
                  styles.metricLabel,
                  {
                    color: mutedTextColor,
                  },
                ]}
              >
                RIDE TIME
              </Text>

            </View>

          </View>

          {/* SAFETY SUMMARY */}

          <View
            style={[
              styles.safetySummary,
              {
                borderTopColor: borderColor,
              },
            ]}
          >

            <View
              style={[
                styles.safetyIcon,
                {
                  backgroundColor:
                    'rgba(0, 255, 157, 0.08)',
                },
              ]}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={17}
                color={greenColor}
              />
            </View>

            <View
              style={styles.safetyTextContainer}
            >

              <Text
                style={[
                  styles.safetyCount,
                  {
                    color: textColor,
                  },
                ]}
              >
                2
              </Text>

              <Text
                style={[
                  styles.safetyDescription,
                  {
                    color:
                      secondaryTextColor,
                  },
                ]}
              >
                safety events today
              </Text>

            </View>

          </View>

        </TouchableOpacity>

        {/* ================= AI RIDER INSIGHT ================= */}

        <TouchableOpacity
          style={[
            styles.aiCard,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
          activeOpacity={0.8}
        >

          <View
            style={[
              styles.aiAccent,
              {
                backgroundColor: purpleColor,
              },
            ]}
          />

          <View style={styles.aiInner}>

            <View style={styles.aiHeader}>

              <View style={styles.aiTitleSection}>

                <View
                  style={[
                    styles.aiIcon,
                    {
                      backgroundColor:
                        'rgba(124, 58, 237, 0.11)',
                    },
                  ]}
                >
                  <Ionicons
                    name="sparkles"
                    size={19}
                    color={purpleColor}
                  />
                </View>

                <View>

                  <Text
                    style={[
                      styles.aiLabel,
                      {
                        color:
                          mutedTextColor,
                      },
                    ]}
                  >
                    AI RIDER INSIGHT
                  </Text>

                  <Text
                    style={[
                      styles.aiTimestamp,
                      {
                        color:
                          mutedTextColor,
                      },
                    ]}
                  >
                    JUST NOW
                  </Text>

                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={19}
                color={mutedTextColor}
              />

            </View>

            <Text
              style={[
                styles.aiMessage,
                {
                  color: textColor,
                },
              ]}
            >
              Smooth riding detected today.
            </Text>

            <View
              style={[
                styles.aiFooter,
                {
                  borderTopColor: borderColor,
                },
              ]}
            >

              <Text
                style={[
                  styles.aiSource,
                  {
                    color: mutedTextColor,
                  },
                ]}
              >
                Based on your riding pattern today
              </Text>

              <Ionicons
                name="arrow-forward"
                size={19}
                color={purpleColor}
              />

            </View>

          </View>

        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  /* ================= SCREEN ================= */

  screen: {
    flex: 1,
  },

  /* ================= HEADER ================= */

  header: {
    width: '100%',

    paddingHorizontal: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

    borderWidth: 1,
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
    fontSize: 19,
    fontWeight: '800',

    letterSpacing: 0.3,
  },

  aiA: {
    fontSize: 19,
    fontWeight: '900',

    letterSpacing: -1,
    marginLeft: 4,
  },

  aiI: {
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

    borderWidth: 1,

    position: 'relative',
  },

  /* ================= NOTIFICATION BADGE ================= */

  notificationBadge: {
    position: 'absolute',

    minWidth: 18,
    height: 18,

    paddingHorizontal: 4,

    borderRadius: 9,

    top: -4,
    right: -4,

    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 2,
  },

  notificationBadgeText: {
    color: '#FFFFFF',

    fontSize: 9,
    fontWeight: '800',

    lineHeight: 11,

    textAlign: 'center',
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
    marginBottom: 8,
  },

  greetingTitle: {
    fontSize: 22,
    fontWeight: '700',
  },

  greetingSubtitle: {
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

    borderRadius: 18,

    borderWidth: 1,
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
  },

  statusDot: {
    width: 9,
    height: 9,

    borderRadius: 5,
  },

  statusTextContainer: {
    flex: 1,
  },

  statusLabel: {
    fontSize: 11,
    fontWeight: '700',

    letterSpacing: 1,

    marginBottom: 4,
  },

  statusTitle: {
    fontSize: 15,
    fontWeight: '800',

    marginBottom: 4,
  },

  statusDescription: {
    fontSize: 12,

    lineHeight: 17,
  },

  /* ================= TODAY'S RIDE ================= */

  rideCard: {
    width: '100%',

    marginTop: 16,

    padding: 18,

    borderRadius: 18,

    borderWidth: 1,
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    marginBottom: 18,
  },

  cardLabel: {
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

    marginRight: 10,
  },

  timeIcon: {
    width: 38,
    height: 38,

    borderRadius: 11,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 10,
  },

  metricValue: {
    fontSize: 24,
    fontWeight: '800',

    letterSpacing: -0.5,
  },

  metricUnit: {
    fontSize: 12,
    fontWeight: '600',

    marginLeft: 3,
  },

  metricLabel: {
    fontSize: 10,
    fontWeight: '700',

    letterSpacing: 0.8,

    marginTop: 6,
  },

  metricDivider: {
    width: 1,
    height: 40,

    marginHorizontal: 8,
  },

  safetySummary: {
    flexDirection: 'row',
    alignItems: 'center',

    marginTop: 18,

    paddingTop: 14,

    borderTopWidth: 1,
  },

  safetyIcon: {
    width: 32,
    height: 32,

    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 10,
  },

  safetyTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  safetyCount: {
    fontSize: 13,
    fontWeight: '800',

    marginRight: 5,
  },

  safetyDescription: {
    fontSize: 12,
  },

  /* ================= AI RIDER INSIGHT ================= */

  aiCard: {
    width: '100%',

    marginTop: 16,

    borderRadius: 18,

    borderWidth: 1,

    overflow: 'hidden',
  },

  aiAccent: {
    position: 'absolute',

    left: 0,
    top: 0,
    bottom: 0,

    width: 3,
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

    marginRight: 10,
  },

  aiLabel: {
    fontSize: 11,
    fontWeight: '700',

    letterSpacing: 1,
  },

  aiTimestamp: {
    fontSize: 9,
    fontWeight: '600',

    letterSpacing: 1,

    marginTop: 2,
  },

  aiMessage: {
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
  },

  aiSource: {
    fontSize: 11,
    fontWeight: '500',
  },

});