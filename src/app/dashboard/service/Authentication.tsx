import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { LoginUserInfo } from '@/components/auth/model/LoginUserInfo';
import { UserSignIn } from '@/components/auth/model/UserSignIn';
import { UserSignUp } from '@/components/auth/model/UserSignUp';
import { Cookie } from '@/components/auth/util/Cookie';

import { API_NEW } from './api';

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
      const response = await axios.post(API_NEW.login, userSignIn, {
        withCredentials: true,
      });

      parseAuthResponse(response);
    } catch (error) {
      console.error('Login failed', error);
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

    localStorage.setItem('currentUser', JSON.stringify(updatedUserInfo));
    setCurrentUser(updatedUserInfo);
  };

  const signUp = async (user: UserSignUp) => {
    return await axios.post(API_NEW.signUp, user);
  };

  const isLoggedIn = () => {
    return Cookie.check('AuthToken');
  };

  const logout = async () => {
    const authToken = Cookie.get('AuthToken');
    const refreshToken = Cookie.get('RefreshToken');

    Cookie.delete('AuthToken');
    Cookie.delete('RefreshToken');
    localStorage.removeItem('currentUser');

    return await axios.post(API_NEW.logout, {
      token: authToken,
      refreshToken: refreshToken,
    });
  };

  const authenticateGuest = async (email: string, guestUserToken: string) => {
    const params = new URLSearchParams();
    params.append('email', email);
    params.append('guestUserToken', guestUserToken);

    return await axios.get(API_NEW.guestAuthentication, {
      params: params,
      withCredentials: true,
    });
  };

  const sendConfirmationLink = async (email: string) => {
    const params = new URLSearchParams();
    params.set('email', email);

    return await axios.get(API_NEW.confirmEmail, { params: params });
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
