import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Input from './Input';
import Button from '../ui/Button';
import FlatButton from '../ui/FlatButton';
import { Colors } from '../../constants/styles';
import { requestPasswordReset, resetPassword } from '../../util/auth';

function ForgotPassword({ onCancel }) {
  const [step, setStep] = useState(1); // 1: email, 2: otp + new password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });

  async function handleRequestReset() {
    const emailIsValid = email.includes('@');
    
    if (!emailIsValid) {
      Alert.alert('Invalid Input', 'Please enter a valid email address.');
      setCredentialsInvalid({ ...credentialsInvalid, email: true });
      return;
    }

    setIsLoading(true);
    setCredentialsInvalid({ ...credentialsInvalid, email: false });

    try {
      await requestPasswordReset(email.trim());
      Alert.alert('Success', 'OTP sent to your email for password reset verification.');
      setStep(2);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleResetPassword() {
    const otpIsValid = otp.length >= 4;
    const passwordIsValid = newPassword.length >= 6;
    const passwordsMatch = newPassword === confirmPassword;

    if (!otpIsValid || !passwordIsValid || !passwordsMatch) {
      Alert.alert('Invalid Input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        otp: !otpIsValid,
        newPassword: !passwordIsValid,
        confirmPassword: !passwordsMatch,
      });
      return;
    }

    setIsLoading(true);
    setCredentialsInvalid({
      otp: false,
      newPassword: false,
      confirmPassword: false,
    });

    try {
      await resetPassword(email.trim(), otp.trim(), newPassword);
      Alert.alert('Success', 'Password reset successfully! You can now login with your new password.');
      onCancel(); // Go back to login
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.description}>
          Enter your email address and we'll send you an OTP to reset your password.
        </Text>
        
        <Input
          label="Email Address"
          onUpdateValue={setEmail}
          value={email}
          keyboardType="email-address"
          isInvalid={credentialsInvalid.email}
        />

        <View style={styles.buttons}>
          <Button onPress={handleRequestReset} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Code'}
          </Button>
        </View>
        
        <View style={styles.cancelButton}>
          <FlatButton onPress={onCancel}>Back to Login</FlatButton>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.description}>
        Enter the OTP sent to your email and your new password.
      </Text>
      
      <Input
        label="Enter OTP"
        onUpdateValue={setOtp}
        value={otp}
        keyboardType="numeric"
        isInvalid={credentialsInvalid.otp}
      />

      <Input
        label="New Password"
        onUpdateValue={setNewPassword}
        value={newPassword}
        secure
        isInvalid={credentialsInvalid.newPassword}
      />

      <Input
        label="Confirm New Password"
        onUpdateValue={setConfirmPassword}
        value={confirmPassword}
        secure
        isInvalid={credentialsInvalid.confirmPassword}
      />

      <View style={styles.buttons}>
        <Button onPress={handleResetPassword} disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </Button>
      </View>
      
      <View style={styles.cancelButton}>
        <FlatButton onPress={onCancel}>Back to Login</FlatButton>
      </View>
    </View>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.primary100,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 18,
  },
  buttons: {
    marginTop: 12,
  },
  cancelButton: {
    marginTop: 16,
  },
});
