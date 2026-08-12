import { View, Text } from 'react-native';

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0A0F1A',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#FFFFFF' }}>
        Settings
      </Text>
    </View>
  );
}