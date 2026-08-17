import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/use-theme-color';

type NotificationType =
  | 'critical'
  | 'warning'
  | 'system'
  | 'ride';

type NotificationItem = {
  type: NotificationType;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
};

const todayNotifications: NotificationItem[] = [
  {
    type: 'critical',
    icon: 'alert-circle-outline',
    title: 'Crash Detected',
    description:
      'SOS alert sent to your emergency contacts',
    time: '06:48 PM',
    unread: true,
  },
  {
    type: 'warning',
    icon: 'eye-outline',
    title: 'Blind Spot Warning',
    description:
      'Vehicle detected in your right blind spot',
    time: '08:42 PM',
    unread: true,
  },
  {
    type: 'system',
    icon: 'checkmark-circle-outline',
    title: 'System Check',
    description:
      'All systems are operational',
    time: '07:15 PM',
  },
  {
    type: 'ride',
    icon: 'play-circle-outline',
    title: 'Ride Started',
    description:
      'Ride tracking has been initiated',
    time: '08:02 AM',
  },
];

const yesterdayNotifications: NotificationItem[] = [
  {
    type: 'warning',
    icon: 'arrow-down-circle-outline',
    title: 'Rear Obstacle',
    description:
      'Obstacle detected behind your bike',
    time: '09:10 PM',
  },
  {
    type: 'system',
    icon: 'information-circle-outline',
    title: 'System Update',
    description:
      'MotoSense safety system was updated',
    time: '06:30 PM',
  },
];

const notificationColors = {
  critical: {
    primary: '#FF4D4D',
    darkBackground:
      'rgba(255, 77, 77, 0.10)',
    lightBackground:
      'rgba(255, 77, 77, 0.10)',
  },

  warning: {
    primary: '#FFB800',
    darkBackground:
      'rgba(255, 184, 0, 0.10)',
    lightBackground:
      'rgba(255, 184, 0, 0.12)',
  },

  system: {
    primary: '#00FF9D',
    darkBackground:
      'rgba(0, 255, 157, 0.10)',
    lightBackground:
      'rgba(0, 200, 133, 0.10)',
  },

  ride: {
    primary: '#00E5FF',
    darkBackground:
      'rgba(0, 229, 255, 0.10)',
    lightBackground:
      'rgba(0, 180, 210, 0.10)',
  },
};

export default function Notifications() {
  const insets = useSafeAreaInsets();

  const [notifications, setNotifications] =
    useState([
      ...todayNotifications,
      ...yesterdayNotifications,
    ]);

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

  const isDark =
    backgroundColor === '#0A0F1A';

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  const openNotification = (
    notification: NotificationItem
  ) => {
    router.push({
      pathname: '/alert-details',
      params: {
        type: notification.type,
        title: notification.title,
        description:
          notification.description,
        time: notification.time,
        icon: notification.icon,
      },
    });
  };

  const today = notifications.slice(0, 4);
  const yesterday = notifications.slice(4);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <StatusBar
        barStyle={
          isDark
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={backgroundColor}
      />

      {/* SAFE AREA */}
      <View
        style={[
          styles.topSafeArea,
          {
            height: insets.top,
            backgroundColor,
          },
        ]}
      />

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={[
            styles.backButton,
            {
              backgroundColor: cardColor,
              borderColor,
            },
          ]}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color={textColor}
          />
        </Pressable>

        <Text
          style={[
            styles.headerTitle,
            {
              color: textColor,
            },
          ]}
        >
          Notifications
        </Text>

        <Pressable
          style={styles.markButton}
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text
            style={[
              styles.markText,
              {
                color:
                  unreadCount > 0
                    ? '#7C3AED'
                    : mutedTextColor,
              },
            ]}
          >
            Mark all
          </Text>
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingBottom:
              insets.bottom + 30,
          },
        ]}
      >
        {/* SUMMARY */}
        <View style={styles.summaryRow}>
          <Text
            style={[
              styles.summaryTitle,
              {
                color: textColor,
              },
            ]}
          >
            Notifications
          </Text>

          {unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text
                style={
                  styles.unreadBadgeText
                }
              >
                {unreadCount} new
              </Text>
            </View>
          )}
        </View>

        {/* TODAY */}
        <NotificationSection
          title="Today"
          notifications={today}
          cardColor={cardColor}
          borderColor={borderColor}
          textColor={textColor}
          secondaryTextColor={
            secondaryTextColor
          }
          isDark={isDark}
          onNotificationPress={
            openNotification
          }
        />

        {/* YESTERDAY */}
        <NotificationSection
          title="Yesterday"
          notifications={yesterday}
          cardColor={cardColor}
          borderColor={borderColor}
          textColor={textColor}
          secondaryTextColor={
            secondaryTextColor
          }
          isDark={isDark}
          onNotificationPress={
            openNotification
          }
        />
      </ScrollView>
    </View>
  );
}

function NotificationSection({
  title,
  notifications,
  cardColor,
  borderColor,
  textColor,
  secondaryTextColor,
  isDark,
  onNotificationPress,
}: {
  title: string;
  notifications: NotificationItem[];
  cardColor: string;
  borderColor: string;
  textColor: string;
  secondaryTextColor: string;
  isDark: boolean;
  onNotificationPress: (
    notification: NotificationItem
  ) => void;
}) {
  return (
    <View style={styles.section}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: textColor,
          },
        ]}
      >
        {title}
      </Text>

      {notifications.map(
        (notification, index) => {
          const colors =
            notificationColors[
              notification.type
            ];

          return (
            <Pressable
              key={`${notification.title}-${index}`}
              onPress={() =>
                onNotificationPress(
                  notification
                )
              }
              style={({ pressed }) => [
                styles.notificationCard,
                {
                  backgroundColor: cardColor,
                  borderColor,
                },
                notification.unread &&
                  styles.unreadCard,
                pressed &&
                  styles.notificationPressed,
              ]}
            >
              {/* ICON */}
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isDark
                      ? colors.darkBackground
                      : colors.lightBackground,
                  },
                ]}
              >
                <Ionicons
                  name={notification.icon}
                  size={22}
                  color={colors.primary}
                />
              </View>

              {/* CONTENT */}
              <View
                style={
                  styles.contentContainer
                }
              >
                <View
                  style={styles.titleRow}
                >
                  <Text
                    style={[
                      styles.notificationTitle,
                      {
                        color: textColor,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {notification.title}
                  </Text>

                  {notification.unread && (
                    <View
                      style={
                        styles.unreadDot
                      }
                    />
                  )}
                </View>

                <Text
                  style={[
                    styles.description,
                    {
                      color:
                        secondaryTextColor,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {notification.description}
                </Text>

                <Text
                  style={[
                    styles.time,
                    {
                      color:
                        secondaryTextColor,
                    },
                  ]}
                >
                  {notification.time}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color={secondaryTextColor}
              />
            </Pressable>
          );
        }
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topSafeArea: {
    width: '100%',
  },

  /* HEADER */

  header: {
    height: 58,
    paddingHorizontal: 18,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 42,
    height: 42,

    borderRadius: 14,

    borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
  },

  markButton: {
    width: 62,
    alignItems: 'flex-end',
  },

  markText: {
    fontSize: 11,
    fontWeight: '700',
  },

  /* CONTENT */

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
  },

  unreadBadge: {
    marginLeft: 9,
    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 10,

    backgroundColor:
      'rgba(124, 58, 237, 0.12)',
  },

  unreadBadgeText: {
    color: '#7C3AED',
    fontSize: 10,
    fontWeight: '700',
  },

  /* SECTION */

  section: {
    marginTop: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',

    marginTop: 8,
    marginBottom: 10,
  },

  /* CARD */

  notificationCard: {
    minHeight: 82,

    borderRadius: 17,
    borderWidth: 1,

    marginBottom: 9,

    paddingHorizontal: 13,
    paddingVertical: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },

  unreadCard: {
    borderColor: '#7C3AED',
  },

  notificationPressed: {
    opacity: 0.72,
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 14,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  contentContainer: {
    flex: 1,
    paddingRight: 8,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 3,
  },

  notificationTitle: {
    fontSize: 14.5,
    fontWeight: '700',

    flexShrink: 1,
  },

  unreadDot: {
    width: 6,
    height: 6,

    borderRadius: 3,

    backgroundColor: '#7C3AED',

    marginLeft: 7,
  },

  description: {
    fontSize: 12,

    lineHeight: 17,
  },

  time: {
    fontSize: 10.5,

    marginTop: 4,
  },
});