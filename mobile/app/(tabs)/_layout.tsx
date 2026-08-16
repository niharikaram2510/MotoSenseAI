import React from 'react';
import {
  TabList,
  TabSlot,
  TabTrigger,
  Tabs,
} from 'expo-router/ui';
import { Ionicons } from '@expo/vector-icons';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemeColor } from '@/hooks/use-theme-color';

type TabIconName = keyof typeof Ionicons.glyphMap;

type CustomTabButtonProps = {
  icon: TabIconName;
  label: string;
  isFocused?: boolean;
};

function CustomTabButton({
  icon,
  label,
  isFocused = false,
}: CustomTabButtonProps) {
  const activeColor = useThemeColor(
    {},
    'tabIconSelected'
  );

  const inactiveColor = useThemeColor(
    {},
    'tabIconDefault'
  );

  const iconColor = isFocused
    ? activeColor
    : inactiveColor;

  return (
    <View style={styles.tabContent}>
      {/* ICON */}
      <View
        style={[
          styles.iconWrapper,
          isFocused && styles.iconWrapperActive,
        ]}
      >
        <Ionicons
          name={icon}
          size={23}
          color={iconColor}
        />
      </View>

      {/* LABEL */}
      <Text
        style={[
          styles.tabLabel,
          {
            color: iconColor,
          },
          isFocused
            ? styles.tabLabelActive
            : styles.tabLabelInactive,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function TabButton({
  icon,
  label,
  ...props
}: CustomTabButtonProps & any) {
  const isFocused =
    props['aria-selected'] === true ||
    props.accessibilityState?.selected === true;

  return (
    <Pressable
      {...props}
      style={styles.tabButton}
    >
      <CustomTabButton
        icon={icon}
        label={label}
        isFocused={isFocused}
      />
    </Pressable>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  const navBackground = useThemeColor(
    {},
    'navBackground'
  );

  const navBorder = useThemeColor(
    {},
    'navBorder'
  );

  return (
    <Tabs>
      {/* CURRENT SCREEN */}
      <TabSlot />

      {/* CUSTOM BOTTOM NAVBAR */}
      <TabList
        style={[
          styles.tabBar,
          {
            backgroundColor: navBackground,
            borderTopColor: navBorder,
            paddingBottom: Math.max(
              insets.bottom,
              9
            ),
          },
        ]}
      >
        {/* HOME */}
        <TabTrigger
          name="home"
          href="/"
          asChild
        >
          <TabButton
            icon="home"
            label="Home"
          />
        </TabTrigger>

        {/* DASHBOARD */}
        <TabTrigger
          name="dashboard"
          href="/dashboard"
          asChild
        >
          <TabButton
            icon="stats-chart"
            label="Dashboard"
          />
        </TabTrigger>

        {/* ALERTS */}
        <TabTrigger
          name="alerts"
          href="/alerts"
          asChild
        >
          <TabButton
            icon="notifications"
            label="Alerts"
          />
        </TabTrigger>

        {/* SETTINGS */}
        <TabTrigger
          name="settings"
          href="/settings"
          asChild
        >
          <TabButton
            icon="settings-outline"
            label="Settings"
          />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  /* =========================
     NAVBAR
  ========================= */

  tabBar: {
    position: 'absolute',

    left: 0,
    right: 0,
    bottom: 0,

    minHeight: 72,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingTop: 7,
    paddingHorizontal: 8,

    borderTopWidth: 1,
  },

  /* =========================
     TAB BUTTON
  ========================= */

  tabButton: {
    flex: 1,

    height: 61,

    alignItems: 'center',
    justifyContent: 'center',
  },

  tabContent: {
    width: '100%',

    height: 61,

    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  /* =========================
     ICON
  ========================= */

  iconWrapper: {
    width: 38,
    height: 34,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 11,
  },

  iconWrapperActive: {
    backgroundColor:
      'rgba(124, 58, 237, 0.14)',
  },

  /* =========================
     LABEL
  ========================= */

  tabLabel: {
    fontSize: 10.5,

    marginTop: 3,

    lineHeight: 14,
  },

  tabLabelActive: {
    fontWeight: '700',
  },

  tabLabelInactive: {
    fontWeight: '600',
  },
});