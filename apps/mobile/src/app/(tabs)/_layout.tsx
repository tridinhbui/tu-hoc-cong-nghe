import { Tabs } from 'expo-router';
import { LayoutGrid, NotebookPen, Layers, ListChecks, UserRound } from 'lucide-react-native';
import { colors } from '@/constants/design';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.emerald[600],
        tabBarInactiveTintColor: colors.stone[400],
        tabBarStyle: { borderTopColor: colors.stone[200] },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Học',
          tabBarIcon: ({ color, size }) => <LayoutGrid color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: 'Ghi chú',
          tabBarIcon: ({ color, size }) => <NotebookPen color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="flashcards"
        options={{
          title: 'Flashcard',
          tabBarIcon: ({ color, size }) => <Layers color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Kiểm tra',
          tabBarIcon: ({ color, size }) => <ListChecks color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Hồ sơ',
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
