import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Button from "../ui/Button";
import FlatButton from "../ui/FlatButton";
import Input from "./Input";

function RegistrationStep2({ onSubmit, onResendOtp, credentialsInvalid, email, resendCount = 0, maxResends = 3 }) {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [countdown, setCountdown] = useState(60); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { otp: otpIsInvalid } = credentialsInvalid;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Reset timer when resend count changes (new OTP sent)
  useEffect(() => {
    if (resendCount > 0) {
      setCountdown(60); // 1 minute as per user's preference
      setCanResend(false);
    }
  }, [resendCount]);

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

  const handleResendOtp = async (event) => {
    // Prevent event bubbling
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    
    console.log('Resend OTP button clicked'); // Debug log
    
    if (isResending || remainingResends <= 0) {
      console.log('Resend blocked:', { isResending, remainingResends }); // Debug log
      return;
    }
    
    setIsResending(true);
    try {
      console.log('Calling onResendOtp...'); // Debug log
      await onResendOtp();
      setCountdown(60); // Reset to 1 minute as per user's preference
      setCanResend(false);
      console.log('Resend OTP successful'); // Debug log
    } catch (error) {
      console.error('Resend OTP error:', error);
    } finally {
      setIsResending(false);
    }
  };

  function submitHandler() {
    console.log('Verify Code button clicked'); // Debug log
    onSubmit({
      otp: enteredOtp,
    });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const remainingResends = maxResends - resendCount;

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
          {!canResend ? (
            <View style={styles.timerContainer}>
              <Text style={styles.waitText}>
                Please wait {formatTime(countdown)} before requesting a new code
              </Text>
            </View>
          ) : (
            <>
              <Text style={styles.resendText}>Didn't receive the code?</Text>
              <TouchableOpacity 
                onPress={handleResendOtp}
                disabled={isResending || remainingResends <= 0}
                activeOpacity={0.7}
                style={[
                  styles.resendButton,
                  (isResending || remainingResends <= 0) && styles.disabledButton
                ]}
              >
                <Text style={[
                  styles.resendButtonText,
                  (isResending || remainingResends <= 0) && styles.disabledButtonText
                ]}>
                  {isResending ? 'Sending...' : 'Resend Code'}
                </Text>
              </TouchableOpacity>
              {remainingResends > 0 && (
                <Text style={styles.resendCountText}>
                  {remainingResends} resend{remainingResends !== 1 ? 's' : ''} remaining
                </Text>
              )}
              {remainingResends <= 0 && (
                <Text style={styles.resendLimitText}>
                  Maximum resend attempts reached
                </Text>
              )}
            </>
          )}
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
  timerContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  waitText: {
    color: '#FFD700',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
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
  resendButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 6,
    marginTop: 8,
  },
  resendButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  disabledButton: {
    borderColor: '#666',
    opacity: 0.5,
  },
  disabledButtonText: {
    color: '#666',
  },
});
