import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

import { LoginUserInfo } from '@/components/auth/model/LoginUserInfo';
import { UserSignIn } from '@/components/auth/model/UserSignIn';
import { UserSignUp } from '@/components/auth/model/UserSignUp';
import { Cookie } from '@/components/auth/util/Cookie';

import { Authentication_API } from './api';

const defaultLoginUserInfo: LoginUserInfo = {
  authToken: '',
  refreshToken: '',
  firstName: '',
  lastName: '',
  email: '',
  userRoleType: '',
};

const useAuthentication = () => {
  const [currentUser, setCurrentUser] = useState<LoginUserInfo>(defaultLoginUserInfo);

  const login = async (userSignIn: UserSignIn) => {
    try {
      const response = await axios.post(Authentication_API.login, userSignIn, {
        withCredentials: true,
      });
      return parseAuthResponse(response); // Ensure this function returns relevant data
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  const parseAuthResponse = (authResponse: AxiosResponse) => {
    const authorizationHeaderValue = authResponse.headers['authorization'];

    Cookie.set('AuthToken', authorizationHeaderValue, 1, '/');

    const updatedUserInfo: LoginUserInfo = {
      authToken: authorizationHeaderValue,
      refreshToken: '', // Set refreshToken from response if available
      firstName: authResponse.data.firstName,
      lastName: authResponse.data.lastName,
      userRoleType: authResponse.data.userRoleType,
      email: authResponse.data.email,
    };

    if (authResponse.data) {
      localStorage.setItem('custom-auth-token', JSON.stringify(updatedUserInfo));
      //    localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
    }
    return authResponse;
  };

  const signUp = async (user: UserSignUp) => {
    try {
      const response = await axios.post(Authentication_API.signUp, user);
      // const token = generateToken();
      //localStorage.setItem('custom-auth-token', token);
      alert('User sign-up successfully');
      toast.success('User sign up success');
      console.log('resposne', response);
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  };

  function generateToken(): string {
    const arr = new Uint8Array(12);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
  }

  const isLoggedIn = () => {
    return Cookie.check('AuthToken');
  };

  const logout = async () => {
    const authToken = Cookie.get('AuthToken');
    const refreshToken = Cookie.get('RefreshToken');

    Cookie.delete('AuthToken');
    Cookie.delete('RefreshToken');
    localStorage.removeItem('currentUser');

    return await axios.post(Authentication_API.logout, {
      token: authToken,
      refreshToken: refreshToken,
    });
  };

  const authenticateGuest = async (email: string, guestUserToken: string) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('guestUserToken', guestUserToken);

    return await axios.get(Authentication_API.guestAuthentication, {
      params: params,
      withCredentials: true,
    });
  };

  const sendConfirmationLink = async (email: string) => {
    const params = new URLSearchParams();
    params.set('email', email);

    return await axios.get(Authentication_API.confirmEmail, { params: params });
  };

  return {
    login,
    signUp,
    isLoggedIn,
    logout,
    authenticateGuest,
    sendConfirmationLink,
    currentUser,
  };
};

export default useAuthentication;
