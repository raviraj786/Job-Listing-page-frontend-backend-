import HomeSrc from "@/src/screens/HomeSrc";
import MessageSrc from "@/src/screens/MessageSrc";
import NetworkSrc from "@/src/screens/NetworkSrc";
import Post from "@/src/screens/Post";
import ProfileSrc from "@/src/screens/ProfileSrc";
import { TAB_ICONS } from "@/src/utils/icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

const Tab = createBottomTabNavigator();

export default function BotamTab() {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#ffffff" }} />
      <StatusBar backgroundColor="#ffff" barStyle="dark-content" />

      <Tab.Navigator
        screenOptions={({ route }) => {
          const iconInfo =
            TAB_ICONS[route.name.toLowerCase() as keyof typeof TAB_ICONS];

          return {
            headerShown: false,
            tabBarActiveTintColor: "#1C58F2",
            tabBarInactiveTintColor: "gray",
            tabBarLabelStyle: {
              fontFamily: "JosefinSans-Regular",
              fontWeight: "500",
              fontSize: 13,
            },

            tabBarIcon: ({ focused, color, size }) => {
              if (!iconInfo) return null;

              const IconComponent = iconInfo.lib;
              return (
                <IconComponent name={iconInfo.name} size={size} color={color} />
              );
            },

            tabBarStyle: {
              height: 130,
              paddingTop: 10,
            },
          };
        }}
      >
        <Tab.Screen name="Home" component={HomeSrc} />
        <Tab.Screen name="Network" component={NetworkSrc} />
        <Tab.Screen name="Post" component={Post} />
        <Tab.Screen name="Message" component={MessageSrc} />
        <Tab.Screen name="Profile" component={ProfileSrc} />
      </Tab.Navigator>
    </>
  );
}
