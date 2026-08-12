import { View, Text } from 'react-native';

export default function Dashboard() {
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
        Dashboard
      </Text>
    </View>
  );
}