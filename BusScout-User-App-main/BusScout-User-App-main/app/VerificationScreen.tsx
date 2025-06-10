import React, { useState, useRef } from "react";
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

const VerificationScreen = () => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const otpArray = [...otp];
    otpArray[index] = value;
    setOtp(otpArray);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 6) {
      Alert.alert("Success", "OTP Verified Successfully!");
      navigation.navigate("HomeScreen");
    } else {
      Alert.alert("Error", "Please enter a valid 6-digit OTP.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your email
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={otp[index]}
            onChangeText={(value) => handleOtpChange(value, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOtp}>
        <View style={styles.buttonContent}>
          <Text style={styles.verifyButtonText}>Verify</Text>
          <Ionicons name="checkmark-done-outline" size={22} color="#fff" />
        </View>
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive the code?</Text>
        <TouchableOpacity
          onPress={() =>
            Alert.alert("OTP Resent", "A new OTP has been sent to your email.")
          }
        >
          <Text style={styles.resendLink}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#f4f4f4",
  },
  verifyButton: {
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
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
  },
  resendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    color: "#333",
  },
  resendLink: {
    marginLeft: 5,
    color: "#000",
    fontWeight: "500",
  },
});
