import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";
import { checkEmailAvailability } from "../../util/auth";

function RegistrationStep1({ onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [emailStatus, setEmailStatus] = useState(null); // null, 'checking', 'available', 'taken'
  const [emailCheckTimeout, setEmailCheckTimeout] = useState(null);

  const {
    email: emailIsInvalid,
    firstName: firstNameIsInvalid,
    lastName: lastNameIsInvalid,
  } = credentialsInvalid;

  // Check email availability with debounce
  useEffect(() => {
    if (enteredEmail.trim().includes('@')) {
      // Clear previous timeout
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }

      // Set new timeout for checking email
      const timeout = setTimeout(async () => {
        setEmailStatus('checking');
        try {
          const result = await checkEmailAvailability(enteredEmail.trim());
          setEmailStatus(result.available ? 'available' : 'taken');
        } catch (error) {
          console.error('Email check failed:', error);
          setEmailStatus(null);
        }
      }, 500); // 500ms debounce

      setEmailCheckTimeout(timeout);
    } else {
      setEmailStatus(null);
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }
    }

    // Cleanup timeout on unmount
    return () => {
      if (emailCheckTimeout) {
        clearTimeout(emailCheckTimeout);
      }
    };
  }, [enteredEmail]);

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

  function getEmailStatusText() {
    switch (emailStatus) {
      case 'checking':
        return '⏳ Checking availability...';
      case 'available':
        return '✅ Email is available';
      case 'taken':
        return '❌ Email is already registered';
      default:
        return '';
    }
  }

  function getEmailStatusStyle() {
    switch (emailStatus) {
      case 'checking':
        return styles.statusChecking;
      case 'available':
        return styles.statusAvailable;
      case 'taken':
        return styles.statusTaken;
      default:
        return {};
    }
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
          isInvalid={emailIsInvalid || emailStatus === 'taken'}
        />
        {emailStatus && enteredEmail.trim().includes('@') && (
          <Text style={[styles.emailStatus, getEmailStatusStyle()]}>
            {getEmailStatusText()}
          </Text>
        )}

        <View style={styles.buttons}>
          <Button 
            onPress={submitHandler}
            disabled={emailStatus === 'checking' || emailStatus === 'taken'}
          >
            Continue
          </Button>
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
