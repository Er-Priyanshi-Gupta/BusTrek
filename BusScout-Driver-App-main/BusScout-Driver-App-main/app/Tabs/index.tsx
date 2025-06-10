import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  DriverScreen: undefined;
  NotificationScreen: undefined;
};

type DriverScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DriverScreen"
>;

const DriverScreen: React.FC = () => {
  const navigation = useNavigation<DriverScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/bg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay} />

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.logoText}>
              Bus<Text style={styles.logoTextHighlight}>Scout</Text>
            </Text>
          </View>

          <View style={styles.profileContainer}>
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Sanskar Soni</Text>
            <View style={styles.busInfoContainer}>
              <Text style={styles.busInfoText}>Assigned Bus: UP-78-8755</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    paddingTop: 30,
  },
  logoText: {
    fontSize: 32,
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "bold",
    color: "#333",
  },
  logoTextHighlight: {
    color: "#A6F10F",
  },
  profileContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    width: "90%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 10,
  },
  busInfoContainer: {
    backgroundColor: "#A6F10F",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  busInfoText: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
  },
});

export default DriverScreen;
