import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import busData from "../../data/data.json";
import useWebSocket from "../hooks/useWebsocket";

type Bus = {
  bus_number: string;
  assigned_driver: string;
  route: string;
  location: {
    latitude: number;
    longitude: number;
  };
  bus_id: string;
};

type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const INITIAL_REGION: Region = {
  latitude: 26.44953082751273,
  longitude: 80.19251466973891,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

const LocationScreen: React.FC = () => {
  // const {isConnected, message, sendMessage} = useWebSocket('wss://fantastic-carnival-r4g667x7x9gf5gx6-8000.app.github.dev/receive/1234');
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [selectedBus, setSelectedBus] = useState<Location | null>(null);

  const handleSearch = () => {
    const socket = new WebSocket(
      "wss://techexpo.skmishra.me/receive/1234"
    );

    socket.onmessage = (event) => {
      setSelectedBus(JSON.parse(event.data));
      console.log(event);
    };

    console.log(selectedBus);
    // const bus = busData.find(
    //   (b) =>
    //     b.bus_id.replace(/\s+/g, "").toLowerCase() ===
    //     searchQuery.trim().replace(/\s+/g, "").toLowerCase()
    // );

    // if (bus) {
    //   setRegion({
    //     latitude: bus.location.latitude,
    //     longitude: bus.location.longitude,
    //     latitudeDelta: 0.02,
    //     longitudeDelta: 0.02,
    //   });
    //   setSelectedBus(bus);
    // } else {
    //   Alert.alert(
    //     "Bus not found",
    //     "Please check the bus number and try again."
    //   );
    //   setRegion(INITIAL_REGION);
    //   setSelectedBus(null);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a Bus"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        {!selectedBus && (
          <Marker
            coordinate={{
              latitude: INITIAL_REGION.latitude,
              longitude: INITIAL_REGION.longitude,
            }}
            title="PSIT Kanpur"
            description="The location of PSIT Kanpur"
          />
        )}
        {selectedBus && (
          <Marker
            coordinate={{
              latitude: selectedBus.latitude,
              longitude: selectedBus.longitude,
            }}
            // title={selectedBus.bus_id}
            // description={`Driver: ${selectedBus.assigned_driver}, Route: ${selectedBus.route}`}
          />
        )}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    elevation: 4,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#f8cb46",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  map: {
    flex: 1,
  },
});

export default LocationScreen;
