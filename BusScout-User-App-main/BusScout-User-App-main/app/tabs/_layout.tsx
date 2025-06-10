import { Tabs } from "expo-router";
import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

const HomeIcon = () => (
  <LottieView
    source={require("../../assets/animations/home.json")}
    autoPlay
    loop
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />
);

const LocationIcon = () => (
  <LottieView
    source={require("../../assets/animations/location.json")}
    autoPlay
    loop
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />
);

const ProfileIcon = () => (
  <LottieView
    source={require("../../assets/animations/profile.json")}
    autoPlay
    loop
    style={{ width: 28, height: 28 }}
    resizeMode="contain"
  />
);

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          paddingTop: 6,
          height: 64,
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginBottom: 5,
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 8,
                borderRadius: 10,
                backgroundColor: focused ? "#EFEFEF" : "transparent",
              }}
            >
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Location"
        options={{
          title: "Location",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: 10,
                backgroundColor: focused ? "#EFEFEF" : "transparent",
              }}
            >
              <LocationIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 5,
                borderRadius: 10,
                backgroundColor: focused ? "#EFEFEF" : "transparent",
              }}
            >
              <ProfileIcon />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
