import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const navigation = useNavigation<any>();
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSignUp = () => {
    if (fullName && email && password) {
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("LoginScreen");
    } else {
      Alert.alert("Error", "Please fill all the fields.");
    }
    navigation.navigate("VerificationScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>
        Sign <Text style={styles.titleHighlight}>Up</Text>
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={20}
          color="#000"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={setFullName}
          value={fullName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={20}
          color="#000"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          onChangeText={setEmail}
          value={email}
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
          placeholder="Password"
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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <View style={styles.buttonContent}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
          <Ionicons name="person-add-outline" size={22} color="#fff" />
        </View>
      </TouchableOpacity>

      <View style={styles.authOptionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginText}>
            Already have an account? <Text style={styles.loginLink}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
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
  signUpButton: {
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
    gap: 8,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
  },
  authOptionsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    color: "#333",
  },
  loginLink: {
    color: "#000",
    fontWeight: "500",
  },
});
