import { Tabs } from "expo-router";
import { Home, User } from 'lucide-react-native';

export default function TabsLayout() {
  return (
   <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#4f46e5' }}>
    <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
    }} />
    <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color, size }) => <User color={color} size={size} />
    }} />
   </Tabs>
  )
}
