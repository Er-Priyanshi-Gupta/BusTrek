import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export type RootParamList = {
  SplashScreen: undefined;
  LoginScreen: undefined;
};

export default function SplashScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const loaderWidth = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {

    Animated.timing(loaderWidth, {
      toValue: 1,
      duration: 4000,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(titleTranslateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(taglineTranslateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.title,
          {
            opacity: titleOpacity,
            transform: [{ translateY: titleTranslateY }],
          },
        ]}
      >
        Bus<Text style={styles.highlight}>out</Text>
      </Animated.Text>
      <Animated.Text
        style={[
          styles.tagline,
          {
            opacity: taglineOpacity,
            transform: [{ translateY: taglineTranslateY }],
          },
        ]}
      >
        Track Your Ride, Anytime, Anywhere!
      </Animated.Text>
      <View style={styles.loaderContainer}>
        <Animated.View
          style={[
            styles.loaderBar,
            {
              width: loaderWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Text style={styles.designedBy}>Designed by</Text>
        <Text style={styles.brainer}>Sunscar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8cb46",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: "#333333",
    marginBottom: 20,
  },
  highlight: {
    color: "#0C831F",
  },
  loaderContainer: {
    width: "34%",
    height: 8,
    backgroundColor: "rgba(236, 236, 236, 0.4)",
    borderRadius: 5,
    overflow: "hidden",
    marginVertical: 40,
  },
  loaderBar: {
    height: "100%",
    backgroundColor: "#1c1c1c",
    position: "absolute",
    left: 0,
    top: 0,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 20,
    alignItems: "center",
  },
  designedBy: {
    fontSize: 12,
    color: "#333333",
  },
  brainer: {
    fontSize: 12,
    color: "#333333",
  },
});
