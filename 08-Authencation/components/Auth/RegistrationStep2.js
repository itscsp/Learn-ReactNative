import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../ui/Button";
import FlatButton from "../ui/FlatButton";
import Input from "./Input";

function RegistrationStep2({ onSubmit, onResendOtp, credentialsInvalid, email }) {
  const [enteredOtp, setEnteredOtp] = useState("");

  const { otp: otpIsInvalid } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    if (inputType === "otp") {
      setEnteredOtp(enteredValue);
    }
  }

  function submitHandler() {
    onSubmit({
      otp: enteredOtp,
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Step 2: Email Verification</Text>
      <Text style={styles.stepDescription}>
        We sent a verification code to {email}. Please enter the 6-digit code below.
      </Text>
      
      <View>
        <Input
          label="Enter Verification Code"
          onUpdateValue={updateInputValueHandler.bind(this, "otp")}
          value={enteredOtp}
          keyboardType="numeric"
          isInvalid={otpIsInvalid}
          maxLength={6}
        />

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>Verify Code</Button>
        </View>
        
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code?</Text>
          <FlatButton onPress={onResendOtp}>Resend Code</FlatButton>
        </View>
      </View>
    </View>
  );
}

export default RegistrationStep2;

const styles = StyleSheet.create({
  form: {
    // Remove flex: 1 to prevent taking all available space
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttons: {
    marginTop: 12,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 8,
  },
});
