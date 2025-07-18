import { Tabs } from "expo-router";
import React from "react";
import TabBar from "@/components/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tabs.Screen 
        name="index" 
        options={{ title: "Home" }} 
      />
      <Tabs.Screen 
        name="Location" 
        options={{ title: "Location" }} 
      />
      <Tabs.Screen 
        name="Profile" 
        options={{ title: "Profile" }} 
      />
    </Tabs>
  );
}
