import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import useWebSocket from "../hooks/useWebsocket";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const LocationScreen = () => {
  const [isRiding, setIsRiding] = useState(false);

  const { isConnected, sendMessage } = useWebSocket(
    "wss://fantastic-carnival-r4g667x7x9gf5gx6-8000.app.github.dev/send/1234"
  );

  const [driverLocation, setDriverLocation] =
    useState<Location.LocationObjectCoords | null>(null);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);

  useEffect(() => {
    let intervalId;

    const startLocationUpdates = async () => {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "You need to enable location permissions to use this feature."
        );
        console.log("Location permission denied");
        return;
      }

      // Set up the interval to send location to the server
      intervalId = setInterval(async () => {
        try {
          const currentLocation = await Location.getCurrentPositionAsync({});
          if (currentLocation?.coords) {
            setDriverLocation(currentLocation.coords);
            console.log(currentLocation.coords);
            sendMessage(currentLocation.coords);
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      }, 3000);
    };

    if (isConnected && isRiding) {
      startLocationUpdates();
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Interval cleared");
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Interval cleared");
      }
    };
  }, [isConnected, isRiding]);

  useEffect(() => {
    const trackLocation = async () => {
      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
          timeInterval: 5000,
        },
        (position) => {
          if (position && position.coords) {
            setDriverLocation(position.coords);
          } else {
            console.log("Unable to fetch position data.");
          }
        }
      );

      setLocationSubscription(subscription);
    };

    trackLocation();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const startRide = () => {
    Alert.alert(
      "Permission Request",
      "Do you allow the app to access your live location?",
      [
        {
          text: "No",
          onPress: () => console.log("Location access denied"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            setIsRiding(true);
          },
        },
      ]
    );
  };

  const endRide = () => {
    Alert.alert("End Ride", "Are you sure you want to end the ride?", [
      {
        text: "No",
        onPress: () => console.log("Ride not ended"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setIsRiding(false);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapBackground}
        region={
          driverLocation
            ? {
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : undefined
        }
        showsUserLocation={true}
      >
        {driverLocation && (
          <Marker coordinate={driverLocation} title="Your Location">
            <Ionicons name="location" size={28} color="#000" />
          </Marker>
        )}
        <Marker
          coordinate={{ latitude: 26.4034, longitude: 80.1403 }}
          title="Pranveer Singh Institute of Technology"
        >
          <Ionicons name="location" size={28} color="#000" />
        </Marker>
      </MapView>

      <View style={styles.bottomCard}>
        <View style={styles.iconWrapper}>
          <Ionicons name="location" size={32} color="#333" />
        </View>
        <Text style={styles.title}>Share your Location</Text>
        <View style={styles.busInfoContainer}>
          <Text style={styles.subtitle}>Bus Id: UP-78-8755</Text>
        </View>
        <TouchableOpacity
          style={isRiding ? styles.endButton : styles.startButton}
          onPress={isRiding ? endRide : startRide}
        >
          <Text style={styles.startButtonText}>
            {isRiding ? "END RIDE" : "START RIDE"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    paddingBottom: 110,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 15,
  },
  iconWrapper: {
    backgroundColor: "#E8EAF6",
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
    textAlign: "center",
  },
  busInfoContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  startButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#A6F10F",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6A1B9A",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  endButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#D70040",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6A1B9A",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  startButtonText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 16,
  },
});

export default LocationScreen;
