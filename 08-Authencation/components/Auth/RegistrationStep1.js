import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";

function RegistrationStep1({ onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");

  const {
    email: emailIsInvalid,
    firstName: firstNameIsInvalid,
    lastName: lastNameIsInvalid,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "firstName":
        setEnteredFirstName(enteredValue);
        break;
      case "lastName":
        setEnteredLastName(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      firstName: enteredFirstName,
      lastName: enteredLastName,
    });
  }

  return (
    <View style={styles.form}>
      <Text style={styles.stepTitle}>Step 1: Personal Information</Text>
      <Text style={styles.stepDescription}>Enter your name and email to start registration</Text>
      
      <View>
        <Input
          label="First Name"
          onUpdateValue={updateInputValueHandler.bind(this, "firstName")}
          value={enteredFirstName}
          isInvalid={firstNameIsInvalid}
        />
        <Input
          label="Last Name (Optional)"
          onUpdateValue={updateInputValueHandler.bind(this, "lastName")}
          value={enteredLastName}
          isInvalid={lastNameIsInvalid}
        />
        <Input
          label="Email Address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>Continue</Button>
        </View>
      </View>
    </View>
  );
}

export default RegistrationStep1;

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
  },
  buttons: {
    marginTop: 12,
  },
});
