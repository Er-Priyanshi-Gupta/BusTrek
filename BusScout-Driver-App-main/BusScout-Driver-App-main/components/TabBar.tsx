import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

interface MyTabBarProps extends BottomTabBarProps {}

const TabBar: React.FC<MyTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const scaleAnimations = useRef(
    state.routes.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    scaleAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: state.index === index ? 1.2 : 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: string =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? (options.title as string)
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const renderIcon = () => {
          const iconName =
            route.name === "index"
              ? "home-outline"
              : route.name === "Location"
              ? "compass-outline"
              : "person-outline";

          return (
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? "#000" : "#555"}
            />
          );
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tabItem, isFocused && styles.activeTabItem]}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleAnimations[index] }] }}
            >
              {renderIcon()}
            </Animated.View>
            <Text style={[styles.tabLabel, isFocused && styles.activeTabLabel]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    height: 70,
    width: "80%",
    borderRadius: 100,
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    elevation: 6,
    gap: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  tabItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    width: 54,
  },
  activeTabItem: {
    height: 54,
    width: 54,
    backgroundColor: "#A6F10F",
    borderRadius: 100,
  },
  tabLabel: {
    color: "#222",
    fontSize: 11,
    marginTop: 2,
  },
  activeTabLabel: {
    display: "none",
  },
});

export default TabBar;
