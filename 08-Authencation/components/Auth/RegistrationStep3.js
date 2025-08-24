import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import Button from "../ui/Button";
import Input from "./Input";
import { checkUsernameAvailability } from "../../util/auth";

function RegistrationStep3({ onSubmit, credentialsInvalid, email }) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [usernameStatus, setUsernameStatus] = useState(null); // null, 'checking', 'available', 'taken'
  const [usernameCheckTimeout, setUsernameCheckTimeout] = useState(null);

  const {
    username: usernameIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  // Check username availability with debounce
  useEffect(() => {
    if (enteredUsername.trim().length >= 3) {
      // Clear previous timeout
      if (usernameCheckTimeout) {
        clearTimeout(usernameCheckTimeout);
      }

      // Set new timeout for checking username
      const timeout = setTimeout(async () => {
        setUsernameStatus('checking');
        try {
          const result = await checkUsernameAvailability(enteredUsername.trim());
          setUsernameStatus(result.available ? 'available' : 'taken');
        } catch (error) {
          console.error('Username check failed:', error);
          setUsernameStatus(null);
        }
      }, 500); // 500ms debounce

      setUsernameCheckTimeout(timeout);
    } else {
      setUsernameStatus(null);
      if (usernameCheckTimeout) {
        clearTimeout(usernameCheckTimeout);
      }
    }

    // Cleanup timeout on unmount
    return () => {
      if (usernameCheckTimeout) {
        clearTimeout(usernameCheckTimeout);
      }
    };
  }, [enteredUsername]);

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

  function getUsernameStatusText() {
    switch (usernameStatus) {
      case 'checking':
        return '⏳ Checking availability...';
      case 'available':
        return '✅ Username is available';
      case 'taken':
        return '❌ Username is already taken';
      default:
        return '';
    }
  }

  function getUsernameStatusStyle() {
    switch (usernameStatus) {
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
      <Text style={styles.stepTitle}>Step 3: Create Account</Text>
      <Text style={styles.stepDescription}>
        Email verified for {email}! Now choose your username and password.
      </Text>
      
      <View>
        <Input
          label="Username"
          onUpdateValue={updateInputValueHandler.bind(this, "username")}
          value={enteredUsername}
          isInvalid={usernameIsInvalid || usernameStatus === 'taken'}
          autoCapitalize="none"
        />
        {usernameStatus && enteredUsername.trim().length >= 3 && (
          <Text style={[styles.usernameStatus, getUsernameStatusStyle()]}>
            {getUsernameStatusText()}
          </Text>
        )}
        
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
          <Button 
            onPress={submitHandler}
            disabled={usernameStatus === 'checking' || usernameStatus === 'taken'}
          >
            Complete Registration
          </Button>
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
  usernameStatus: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  statusChecking: {
    color: '#FFA500',
  },
  statusAvailable: {
    color: '#4CAF50',
  },
  statusTaken: {
    color: '#F44336',
  },
});
