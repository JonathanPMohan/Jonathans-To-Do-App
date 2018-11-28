import 'bootstrap';
import firebase from 'firebase/app';
// import $ from 'jquery';
import apiKeys from '../db/apiKeys.json';

import './index.scss';
import tasks from './components/TasksPage/tasksPage';
import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import checkLoginStatus from './components/helpers/authHelpers';


const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  checkLoginStatus();
  loginButton();
  tasks.getTasks();
  tasks.initView();
};

initializeApp();
