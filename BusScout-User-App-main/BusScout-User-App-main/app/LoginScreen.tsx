import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = () => {
    if (phoneNumber && password) {
      navigation.navigate("tabs");
    } else {
      Alert.alert("Error", "Please enter both phone number and password.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.Text style={styles.title}>
        Sign <Text style={styles.titleHighlight}>In</Text>
      </Animated.Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="call-outline"
          size={20}
          color="#000"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="+91"
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={20}
          color="#000"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Your Password"
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color="#000"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("ResetScreen")}>
        <Text style={styles.forgotLink}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <View style={styles.buttonContent}>
          <Text style={styles.loginButtonText}>Login</Text>
          <Ionicons
            name="log-in-outline"
            size={22}
            color="#fff"
            style={styles.arrowIcon}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.authOptionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerText}>
            Don’t have an account?{" "}
            <Text style={styles.registerLink}>Register Now</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  title: {
    fontSize: 42,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 30,
    textAlign: "center",
  },
  titleHighlight: {
    color: "#888",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  loginButton: {
    width: "70%",
    alignSelf: "center",
    backgroundColor: "#000",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
  },
  arrowIcon: {
    marginLeft: 5,
  },
  authOptionsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  forgotText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  forgotLink: {
    textAlign: "right",
    color: "#000",
    fontWeight: "500",
  },
  registerText: {
    fontSize: 16,
    color: "#333",
  },
  registerLink: {
    color: "#000",
    fontWeight: "500",
  },
});
