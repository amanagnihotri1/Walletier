/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import brandLogo from "../../assets/wallet.png";
import { PasswordInput, Button, LoadingOverlay, Text, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link, useNavigate, useParams } from 'react-router-dom';
import style from "../resetPassword/resetpassword.module.scss";
import { notifications } from '@mantine/notifications';
import apiCall from '../../utils/apiService';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams<{ id: string; token: string }>();
  const [visible, { toggle }] = useDisclosure(false);
  const [confirmVisible, { toggle: toggleConfirm }] = useDisclosure(false);
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validatePassword = (value: string): string => {
    if (!value.trim()) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters long';
    return '';
  };

  const validateConfirmPassword = (value: string): string => {
    if (!value.trim()) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return '';
  };

  const handleSubmit = async () => {
    const pwError = validatePassword(password);
    const cpError = validateConfirmPassword(confirmPassword);

    setPasswordError(pwError);
    setConfirmPasswordError(cpError);

    if (pwError || cpError) return;

    if (!id || !token) {
      notifications.show({
        title: "Error",
        color: 'red',
        message: "Invalid password reset link. Please request a new one.",
        autoClose: 3000,
      });
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await apiCall('POST', '/auth/passwordreset', {
        id,
        token,
        password,
        confirmPassword,
      });

      if (error) {
        setPasswordError(error);
        notifications.show({
          title: "Error",
          color: 'red',
          message: error,
          autoClose: 3000,
        });
      } else {
        setIsSuccess(true);
        notifications.show({
          title: "Success",
          message: "Your password has been reset successfully",
          color: 'teal',
          autoClose: 5000,
        });
      }
    } catch (err: any) {
      console.error("Error resetting password:", err);
      setPasswordError(err.message || 'Failed to reset password. Please try again.');
      notifications.show({
        title: "Error",
        message: `${err.message}`,
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
    <div className={style['resetPasswordBackground']}>
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />

      <div className={style['resetPasswordWrapper']}>
        <div className={style['brandCover']}>
          <img src={brandLogo} alt="brand_logo" width={50} height={50} />
        </div>
        <div className={style['formContainer']}>
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className={style['headerSection']}>
                <Text 
                  className={style['mainHeading']} 
                  fw={700} 
                  variant={'gradient'}
                  gradient={{ from: 'violet', to: 'rgba(56, 55, 55, 1)', deg: 147 }}
                >
                  Reset Password
                </Text>
                <Text className={style['subheading']}>
                  Enter your new password below to regain access.
                </Text>
              </div>
              <Stack gap="md" className={style['formStack']}>
                <PasswordInput
                  label="New Password"
                  placeholder="Enter new password"
                  value={password}
                  visible={visible}
                  onVisibilityChange={toggle}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  onKeyDown={handleKeyPress}
                  error={passwordError || false}
                  disabled={isLoading}
                  leftSection={<i className="uil uil-keyhole-circle"></i>}
                  classNames={{
                    input: style['passwordInput'],
                    label: style['inputLabel'],
                    error: style['errorMessage'],
                    innerInput: style['passwordInnerInput'],
                  }}
                  required
                />

                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  visible={confirmVisible}
                  onVisibilityChange={toggleConfirm}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError('');
                  }}
                  onKeyDown={handleKeyPress}
                  error={confirmPasswordError || false}
                  disabled={isLoading}
                  leftSection={<i className="uil uil-lock"></i>}
                  classNames={{
                    input: style['passwordInput'],
                    label: style['inputLabel'],
                    error: style['errorMessage'],
                    innerInput: style['passwordInnerInput'],
                  }}
                  required
                />
                <Text className={style['passwordHint']}>
                  Password must be at least 6 characters long.
                </Text>

                <Button 
                  className={style['submitButton']}
                  onClick={handleSubmit}
                  disabled={!password || !confirmPassword || isLoading}
                  loading={isLoading}
                >
                  Reset Password
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
                  Need a new reset link? 
                  <Link to="/auth/forgetPassword" className={style['resetLink']}>
                    Request Again
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className={style['successContainer']}>
              <div className={style['successIcon']}>
                <i className="uil uil-check-circle"></i>
              </div>
              <Text className={style['successHeading']} fw={700}>
                Password Reset!
              </Text>
              <Text className={style['successMessage']}>
                Your password has been successfully updated.
              </Text>
              <Text className={style['successSubtext']}>
                You can now log in with your new password.
              </Text>
              <Button 
                className={style['submitButton']}
                onClick={() => navigate('/auth/login')}
              >
                Go to Login
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

