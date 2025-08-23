import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import FlatButton from '../ui/FlatButton';
import AuthForm from './AuthForm';
import { Colors } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

function AuthContent({ isLogin, onAuthenticate, isOtp }) {

  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
    otp: false,
  });

  function switchAuthModeHandler() {
    if(isLogin) {
      navigation.replace('Signup')
    } else {
      navigation.replace('Login')
    }
  }

  function submitHandler(credentials) {
    // Handle OTP submission
    if (isOtp) {
      let { email, otp } = credentials;
      
      otp = otp?.trim();
      const otpIsValid = otp && otp.length >= 4; // Assuming OTP is at least 4 digits
      
      if (!otpIsValid) {
        Alert.alert('Invalid input', 'Please enter a valid OTP.');
        setCredentialsInvalid({
          ...credentialsInvalid,
          otp: !otpIsValid,
        });
        return;
      }
      
      onAuthenticate({ email, otp });
      return;
    }

    // Handle regular login/signup submission
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
        otp: false,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <View style={styles.form}>
      <AuthForm
        isLogin={isLogin}
        onSubmit={submitHandler}
        credentialsInvalid={credentialsInvalid}
        isOtp={isOtp}
      />
      {!isOtp && (
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin ? 'Create a new user' : 'Log in instead'}
          </FlatButton>
        </View>
      )}
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  form: {
    // flex: 1,
  },
  buttons: {
    marginTop: 16,
  },
});
