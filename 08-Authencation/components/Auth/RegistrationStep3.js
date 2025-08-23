import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";

function RegistrationStep3({ onSubmit, credentialsInvalid, email }) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    username: usernameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "username":
        setEnteredUsername(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      username: enteredUsername,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Step 3: Create Account</Text>
      <Text style={styles.stepDescription}>
        Email verified for {email}! Now choose your username and password.
      </Text>
      
      <View>
        <Input
          label="Username"
          onUpdateValue={updateInputValueHandler.bind(this, "username")}
          value={enteredUsername}
          isInvalid={usernameIsInvalid}
          autoCapitalize="none"
        />
        <Input
          label="Password"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>Complete Registration</Button>
        </View>
      </View>
    </View>
  );
}

export default RegistrationStep3;

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
});
