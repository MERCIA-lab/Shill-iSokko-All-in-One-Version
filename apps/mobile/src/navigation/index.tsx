import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LayoutDashboard, Truck, User, Bell } from "lucide-react-native";

import { colors } from "../theme/colors";
import { DashboardScreen } from "../screens/DashboardScreen";
import { ShipmentsScreen } from "../screens/ShipmentsScreen";
import { CustomersScreen } from "../screens/CustomersScreen";
import { NotificationsScreen } from "../screens/NotificationsScreen";

const Tab = createBottomTabNavigator();

/** Mobile nav mirrors the admin sidebar's primary items as bottom tabs. */
export function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.red,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.line }
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Shipments"
        component={ShipmentsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Truck color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Customers"
        component={CustomersScreen}
        options={{ tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Bell color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
