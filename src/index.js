import 'bootstrap';
import firebase from 'firebase/app';

import apiKeys from '../db/apiKeys.json';

import './index.scss';

import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './components/helpers/authHelpers';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  checkLoginStatus();
  loginButton();
};

initializeApp();
