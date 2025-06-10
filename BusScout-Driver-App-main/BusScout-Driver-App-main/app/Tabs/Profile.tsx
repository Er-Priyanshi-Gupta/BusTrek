import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.glassEffect}>
          <Text style={styles.name}>Sanskar Soni</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoContainer}>
          <View style={styles.card}>
            <View style={styles.infoItem}>
              <FontAwesome name="user" size={22} color="#555555" />
              <Text style={styles.infoText}>Sanskar Soni</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <FontAwesome name="phone" size={22} color="#555555" />
              <Text style={styles.infoText}>+91 8547912497</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <FontAwesome name="envelope" size={22} color="#555555" />
              <Text style={styles.infoText}>sanskar.soni@google.com</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <FontAwesome name="bus" size={22} color="#555555" />
              <Text style={styles.infoText}>UP-78-8755</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.infoItem}>
              <FontAwesome name="eye" size={22} color="#555555" />
              <Text style={styles.infoText}>Change Password</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#A6F10F",
    width: "130%",
    paddingVertical: 60,
    borderBottomLeftRadius: 700,
    borderBottomRightRadius: 700,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  glassEffect: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    marginBottom: 20,
  },
  name: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: -20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    width: "100%",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#000",
    marginLeft: 20,
  },
});

export default Profile;
