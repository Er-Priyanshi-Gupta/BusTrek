import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import LinearGradient from "react-native-linear-gradient";

const Profile: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <View style={styles.accountSection}>
        <View style={styles.accountTextContainer}>
          <Text style={styles.accountTitle}>My Account</Text>
          <Text style={styles.userName}>Sanskar Soni</Text>
          <Text style={styles.userPhone}>9696279459</Text>
        </View>
        <Image
          source={require("../../assets/images/user.png")}
          style={styles.userImage}
        />
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <FontAwesome name="bus" size={24} color="#222" />
          <Text style={styles.optionText}>My Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <FontAwesome name="map" size={24} color="#222" />
          <Text style={styles.optionText}>Track Bus</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <FontAwesome name="bell" size={24} color="#222" />
          <Text style={styles.optionText}>Alerts</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.informationContainer}>
        <Text style={styles.sectionTitle}>BUS TRACKING INFORMATION</Text>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="map-marker" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>Nearby Bus Stops</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="clock-o" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>Bus Arrival Times</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="road" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>Route Information</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="history" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>Travel History</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.informationContainer}>
        <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="question-circle" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="info-circle" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>About App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.listItem}>
          <FontAwesome name="cog" size={24} color="#4a4a4a" />
          <Text style={styles.listItemText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },
  accountSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  accountTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  accountTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: "#777",
  },
  userPhone: {
    fontSize: 14,
    color: "#777",
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(248, 203, 70, 0.3)",
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 10,
  },
  optionButton: {
    alignItems: "center",
  },
  optionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4a4a4a",
  },
  informationContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  listItemText: {
    fontSize: 16,
    marginLeft: 16,
    color: "#333",
  },
});
