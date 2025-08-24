import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../store/auth-context';
import { changePassword, requestChangePasswordOtp, resendOtp } from '../util/auth';
import Button from '../components/ui/Button';

function ChangePasswordScreen() {
  const [otp, setOtp] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [resendCount, setResendCount] = useState(0);
  const maxResends = 3;
  
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanResendOtp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleRequestOtp = async () => {
    setIsLoading(true);
    try {
      await requestChangePasswordOtp(authCtx.token);
      setOtpSent(true);
      setCountdown(300); // 5 minutes
      setCanResendOtp(false);
      Alert.alert('Success', 'OTP sent to your registered email address.');
    } catch (error) {
      console.error('Request OTP error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to send OTP. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCount >= maxResends) {
      Alert.alert("Error", "Maximum resend attempts reached. Please try again later.");
      return;
    }

    setIsLoading(true);
    try {
      await resendOtp(authCtx.profile?.email);
      setResendCount(prev => prev + 1);
      setCountdown(300); // 5 minutes
      setCanResendOtp(false);
      Alert.alert('Success', 'OTP resent to your registered email address.');
    } catch (error) {
      console.error('Resend OTP error:', error);
      if (error.response?.status === 429) {
        Alert.alert("Error", "Please wait before requesting another OTP.");
      } else {
        Alert.alert(
          'Error',
          error.response?.data?.message || 'Failed to resend OTP. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleChangePassword = async () => {
    // Validation
    if (!otp || !currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!otpSent) {
      Alert.alert('Error', 'Please request OTP first');
      return;
    }

    if (otp.length !== 6) {
      Alert.alert('Error', 'OTP must be 6 digits');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      await changePassword(authCtx.token, otp, currentPassword, newPassword);
      
      Alert.alert(
        'Success',
        'Password changed successfully. Please login again.',
        [
          {
            text: 'OK',
            onPress: () => {
              authCtx.logout();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Change password error:', error);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to change password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>
          {otpSent ? 'Changing password...' : 'Sending OTP...'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.description}>
        {!otpSent 
          ? 'First, request an OTP to verify your identity. Then enter your current password and new password.'
          : 'Enter the OTP sent to your email, your current password, and your new password.'
        }
      </Text>

      {!otpSent && (
        <View style={styles.otpRequestContainer}>
          <Button onPress={handleRequestOtp}>
            Request OTP
          </Button>
        </View>
      )}

      {otpSent && (
        <>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>OTP (6 digits)</Text>
            <TextInput
              style={styles.input}
              value={otp}
              onChangeText={setOtp}
              placeholder="Enter 6-digit OTP"
              keyboardType="numeric"
              maxLength={6}
              autoCapitalize="none"
            />
          </View>

          {/* OTP Timer and Resend */}
          <View style={styles.otpTimerContainer}>
            {countdown > 0 ? (
              <Text style={styles.waitText}>
                Please wait {formatTime(countdown)} before requesting a new OTP
              </Text>
            ) : canResendOtp ? (
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Didn't receive the OTP?</Text>
                <TouchableOpacity 
                  onPress={handleResendOtp}
                  disabled={resendCount >= maxResends}
                  style={[
                    styles.resendButton,
                    resendCount >= maxResends && styles.disabledButton
                  ]}
                >
                  <Text style={[
                    styles.resendButtonText,
                    resendCount >= maxResends && styles.disabledButtonText
                  ]}>
                    Resend OTP
                  </Text>
                </TouchableOpacity>
                {maxResends - resendCount > 0 && (
                  <Text style={styles.resendCountText}>
                    {maxResends - resendCount} resend{maxResends - resendCount !== 1 ? 's' : ''} remaining
                  </Text>
                )}
                {resendCount >= maxResends && (
                  <Text style={styles.resendLimitText}>
                    Maximum resend attempts reached
                  </Text>
                )}
              </View>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password</Text>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Enter current password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password (min 6 characters)"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={handleChangePassword}>
              Change Password
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    marginTop: 20,
  },
  otpRequestContainer: {
    marginBottom: 30,
  },
  otpTimerContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  waitText: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  resendButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
  },
  resendButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  disabledButton: {
    borderColor: '#ccc',
  },
  disabledButtonText: {
    color: '#ccc',
  },
  resendCountText: {
    color: '#4CAF50',
    fontSize: 12,
    marginTop: 4,
  },
  resendLimitText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default ChangePasswordScreen;
