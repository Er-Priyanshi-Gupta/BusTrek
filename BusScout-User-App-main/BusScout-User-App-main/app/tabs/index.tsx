import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [carouselIndex, setCarouselIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const carouselItems = [
    require("../../assets/images/img1.webp"),
    require("../../assets/images/img2.webp"),
    require("../../assets/images/img3.webp"),
    require("../../assets/images/img4.jpg"),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  useEffect(() => {
    Animated.spring(scrollX, {
      toValue: carouselIndex * width * 0.8,
      useNativeDriver: false,
    }).start();
  }, [carouselIndex]);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={["#FFD700", "#FFEB3B"]} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.textContainer}>
            <Text style={styles.deliveryText}>Your Bus in</Text>
            <Text style={styles.timeText}>8 minutes</Text>
            <Text style={styles.addressText}>
              Home - Phool Bagh Chouraha, Civil...
            </Text>
          </View>
          <TouchableOpacity
            style={styles.profileImageWrapper}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color="#333" />
          <TextInput
            style={styles.searchInput}
            placeholder='Search "blanket"'
            placeholderTextColor="#808080"
          />
          <Ionicons name="mic" size={22} color="#333" />
        </View>
      </LinearGradient>

      <View style={styles.featuresSection}>
        <Text style={styles.featuresHeading}>Our Features</Text>
        <View style={styles.featuresGrid}>
          <TouchableOpacity style={styles.featureCard}>
            <Image
              source={require("../../assets/images/f1.png")}
              style={styles.featureImage}
            />
            <Text style={styles.featureTitle}>Real-Time Tracking</Text>
            <Text style={styles.featureDescription}>
              Track your bus in real-time with precise updates.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard}>
            <Image
              source={require("../../assets/images/f2.png")}
              style={styles.featureImage}
            />
            <Text style={styles.featureTitle}>Bus Occupancy</Text>
            <Text style={styles.featureDescription}>
              Know the available seats before you board.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard}>
            <Image
              source={require("../../assets/images/f3.png")}
              style={styles.featureImage}
            />
            <Text style={styles.featureTitle}>Send Bus Request</Text>
            <Text style={styles.featureDescription}>
              Request a bus to your nearest stop instantly.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.featureCard}>
            <Image
              source={require("../../assets/images/f4.png")}
              style={styles.featureImage}
            />
            <Text style={styles.featureTitle}>ETA Updates</Text>
            <Text style={styles.featureDescription}>
              Get real-time ETA updates for your journey.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.trackHeading}>Our Features</Text>
      <View style={styles.banner}>
        <Image
          source={require("../../assets/images/bus.jpg")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerTextWrapper}>
          <Text style={styles.bannerHeading}>Now Track you Ride</Text>
          <Text style={styles.bannerSubHeading}>to your Bus Stop</Text>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Track now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carousel}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {carouselItems.map((item, index) => (
            <View key={index} style={styles.carouselItem}>
              <Image source={item} style={styles.carouselImage} />
              <LinearGradient
                colors={["rgba(0,0,0,0.3)", "transparent"]}
                style={styles.carouselOverlay}
              />
            </View>
          ))}
        </Animated.ScrollView>
        <View style={styles.dotWrapper}>
          {carouselItems.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                carouselIndex === index ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
  },
  deliveryText: {
    color: "#333",
    fontSize: 18,
    fontWeight: "500",
  },
  timeText: {
    color: "#333",
    fontSize: 24,
    fontWeight: "bold",
  },
  addressText: {
    color: "#555",
    fontSize: 14,
    marginTop: 10,
  },
  profileImageWrapper: {
    marginLeft: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(241, 241, 241, 0.8)",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffffff",
    paddingHorizontal: 10,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },
  featuresSection: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  featuresHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 20,
    textAlign: "left",
  },
  trackHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 20,
    paddingLeft: 20,
    textAlign: "left",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "rgba(248, 203, 70, 0.1)",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  featureImage: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 10,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  carousel: {
    marginVertical: 20,
  },
  carouselItem: {
    width: width * 0.9,
    marginHorizontal: width * 0.05,
    borderRadius: 15,
    overflow: "hidden",
  },
  carouselImage: {
    width: "100%",
    height: 200,
  },
  carouselOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 15,
  },
  dotWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#0E76A8",
  },
  banner: {
    margin: 20,
    marginTop: 0,
    backgroundColor: "rgba(248, 203, 70, 0.3)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  bannerTextWrapper: {
    marginLeft: 20,
  },
  bannerHeading: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bannerSubHeading: {
    fontSize: 14,
    color: "#555",
  },
  shopButton: {
    width: 90,
    marginTop: 10,
    backgroundColor: "#f8cb46",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  shopButtonText: {
    color: "#333",
    fontSize: 14,
  },
});

export default HomeScreen;
