/* eslint-disable @typescript-eslint/no-unused-vars */
import '@mantine/core/styles/Notification.css';
import axios from 'axios';
import React, { useState } from 'react';
import '@mantine/core/styles/Loader.css';
import brandLogo from "../../assets/wallet.png";
import '@mantine/core/styles/LoadingOverlay.css';
import { TextInput, Button, LoadingOverlay, Text, Stack} from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import style from "../forgetPassword/forgetpassword.module.scss";
import { notifications } from '@mantine/notifications';
export const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Email validation
  const validateEmail = (emailValue: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleSubmit = async () => {
    setEmailError('');

    // Validation
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      console.log("Sending password reset email...");
      
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/passwordrequest`,
        { email },
        { withCredentials: true }
      );
      setIsSubmitted(true);
      notifications.show({
        title: "Success",
        message: "Password reset link has been sent to your email",
        color: 'teal',
        autoClose: 5000
      });


    } catch (err: any) {
      console.error("Error sending reset email:", err);
      setEmailError(err.response?.data?.message || 'Failed to send reset link. Please try again.');  
      notifications.show({
        title: "Error",
        color:'red',
        message: err.response?.data?.message || 'Something went wrong. Please try again.',
        autoClose: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={style['forgetPasswordBackground']}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />

      <div className={style['forgetPasswordWrapper']}>
        {/* Logo Section */}
        <div className={style['brandCover']}>
          <img src={brandLogo} alt="brand_logo" width={50} height={50} />
        </div>

        {/* Main Form Container */}
        <div className={style['formContainer']}>
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className={style['headerSection']}>
                <Text 
                  className={style['mainHeading']} 
                  fw={700} 
                  variant={'gradient'}
                  gradient={{ from: 'violet', to: 'rgba(56, 55, 55, 1)', deg: 147 }}
                >
                  Forgot Password?
                </Text>
                <Text className={style['subheading']}>
                  No worries. We'll send you reset instructions.
                </Text>
              </div>

              {/* Form Section */}
              <Stack gap="md" className={style['formStack']}>
                <TextInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  leftSection={<i className="uil uil-envelope-check"></i>}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                  }}
                  onKeyPress={handleKeyPress}
                  error={emailError || false}
                  disabled={isLoading}
                  classNames={{
                    input: style['emailInput'],
                    label: style['inputLabel'],
                    error: style['errorMessage']
                  }}
                  required
                />

                <Button 
                  className={style['submitButton']}
                  onClick={handleSubmit}
                  disabled={!email || isLoading}
                  loading={isLoading}
                >
                  Send Reset Link
                </Button>
              </Stack>

              {/* Footer Links */}
              <div className={style['footerLinks']}>
                <p>
                  Remember your password? 
                  <Link to="/auth/login" className={style['loginLink']}>
                    Back to Login
                  </Link>
                </p>
                <p>
                  Don't have an account? 
                  <Link to="/auth/signup" className={style['signupLink']}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </>
          ) : (
            // Success State
            <div className={style['successContainer']}>
              <div className={style['successIcon']}>
                <i className="uil uil-check-circle"></i>
              </div>
              <Text className={style['successHeading']} fw={700}>
                Email Sent!
              </Text>
              <Text className={style['successMessage']}>
                We've sent a password reset link to <strong>{email}</strong>
              </Text>
              <Text className={style['successSubtext']}>
                Check your inbox and follow the link to reset your password. 
              </Text>
              <Button 
                variant="light"
                onClick={() => navigate('/auth/login')}
                className={style['redirectButton']}
              >
                Back to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
