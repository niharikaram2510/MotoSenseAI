import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Slot, router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type IconName = keyof typeof Ionicons.glyphMap;

type NavItem = {
  label: string;
  icon: IconName;
  route: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    icon: 'home',
    route: '/(tabs)',
  },
  {
    label: 'Dashboard',
    icon: 'stats-chart',
    route: '/(tabs)/dashboard',
  },
  {
    label: 'Alerts',
    icon: 'notifications',
    route: '/(tabs)/alerts',
  },
  {
    label: 'Settings',
    icon: 'settings-outline',
    route: '/(tabs)/settings',
  },
];

export default function WebLayout() {
  const pathname = usePathname();

  const isActive = (route: string) => {
    if (
      route === '/(tabs)' ||
      route === '/'
    ) {
      return (
        pathname === '/' ||
        pathname === '/(tabs)'
      );
    }

    return pathname.startsWith(
      route.replace('/(tabs)', '')
    );
  };

  const goTo = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.root}>

      {/* =====================================================
          DESKTOP SIDEBAR
      ===================================================== */}

      <View style={styles.sidebar}>

        {/* BRAND */}

        <View style={styles.brandSection}>
          <View style={styles.logoBox}>
            <Ionicons
              name="bicycle"
              size={28}
              color="#00E5FF"
            />
          </View>

          <View style={styles.brandTextContainer}>
            <Text style={styles.brandText}>
              MOTOSENSE
            </Text>

            <Text style={styles.brandAI}>
              AI
            </Text>
          </View>
        </View>

        {/* DIVIDER */}

        <View style={styles.divider} />

        {/* NAVIGATION */}

        <View style={styles.navigation}>

          {NAV_ITEMS.map((item) => {
            const active = isActive(item.route);

            return (
              <Pressable
                key={item.label}
                onPress={() => goTo(item.route)}
                style={[
                  styles.navItem,
                  active && styles.navItemActive,
                ]}
              >
                <View
                  style={[
                    styles.navIconBox,
                    active &&
                      styles.navIconBoxActive,
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={21}
                    color={
                      active
                        ? '#7C3AED'
                        : '#8A98B3'
                    }
                  />
                </View>

                <Text
                  style={[
                    styles.navLabel,
                    active &&
                      styles.navLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}

        </View>

        {/* CONNECTED BIKE */}

        <View style={styles.connectionSection}>

          <View style={styles.connectionCard}>

            <View style={styles.connectionRow}>

              <View
                style={styles.connectionDot}
              />

              <Text style={styles.connectionTitle}>
                Bike Connected
              </Text>

            </View>

            <Text style={styles.connectionSubtitle}>
              Last synced just now
            </Text>

          </View>

        </View>

      </View>

      {/* =====================================================
          MAIN WEB CONTENT
      ===================================================== */}

      <View style={styles.mainContent}>
        <Slot />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  /* =====================================================
     ROOT
  ===================================================== */

  root: {
    flex: 1,
    width: '100%',
    height: '100%',
    minHeight: 0,

    flexDirection: 'row',

    backgroundColor: '#080D18',
  },

  /* =====================================================
     SIDEBAR
  ===================================================== */

  sidebar: {
    position: 'fixed' as any,

    left: 0,
    top: 0,
    bottom: 0,

    width: 240,

    backgroundColor: '#0A0F1A',

    borderRightWidth: 1,
    borderRightColor: '#1C2333',

    zIndex: 100,

    flexDirection: 'column',
  },

  /* =====================================================
     BRAND
  ===================================================== */

  brandSection: {
    height: 112,

    paddingHorizontal: 20,

    flexDirection: 'row',
    alignItems: 'center',
  },

  logoBox: {
    width: 48,
    height: 48,

    borderRadius: 15,

    backgroundColor:
      'rgba(124, 58, 237, 0.16)',

    borderWidth: 1,
    borderColor:
      'rgba(124, 58, 237, 0.30)',

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 12,
  },

  brandTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },

  brandText: {
    color: '#F6F8FC',

    fontSize: 16,
    fontWeight: '900',

    letterSpacing: 0.4,
  },

  brandAI: {
    color: '#00E5FF',

    fontSize: 16,
    fontWeight: '900',

    marginLeft: 4,
  },

  divider: {
    height: 1,

    backgroundColor: '#1C2333',

    width: '100%',
  },

  /* =====================================================
     NAVIGATION
  ===================================================== */

  navigation: {
    paddingHorizontal: 14,
    paddingTop: 22,
  },

  navItem: {
    height: 52,

    width: '100%',

    borderRadius: 10,

    paddingHorizontal: 10,

    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 8,
  },

  navItemActive: {
    backgroundColor:
      'rgba(124, 58, 237, 0.18)',
  },

  navIconBox: {
    width: 36,
    height: 36,

    borderRadius: 9,

    alignItems: 'center',
    justifyContent: 'center',

    marginRight: 10,
  },

  navIconBoxActive: {
    backgroundColor:
      'rgba(124, 58, 237, 0.14)',
  },

  navLabel: {
    color: '#8A98B3',

    fontSize: 14,
    fontWeight: '600',
  },

  navLabelActive: {
    color: '#F6F8FC',

    fontWeight: '700',
  },

  /* =====================================================
     CONNECTION
  ===================================================== */

  connectionSection: {
    marginTop: 'auto',

    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  connectionCard: {
    borderTopWidth: 1,
    borderTopColor: '#1C2333',

    paddingTop: 16,
  },

  connectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  connectionDot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: '#00FF9D',

    marginRight: 9,
  },

  connectionTitle: {
    color: '#F6F8FC',

    fontSize: 12,
    fontWeight: '700',
  },

  connectionSubtitle: {
    color: '#71809A',

    fontSize: 10,

    marginTop: 4,
    marginLeft: 17,
  },

  /* =====================================================
     MAIN CONTENT
  ===================================================== */

  mainContent: {
    flex: 1,

    width: '100%',
    height: '100%',

    minHeight: 0,

    marginLeft: 240,

    overflow: 'hidden',
  },
});