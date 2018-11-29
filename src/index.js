import 'bootstrap';
import firebase from 'firebase/app';
// import $ from 'jquery';
import apiKeys from '../db/apiKeys.json';

import './index.scss';
import navbar from './components/Navbar/navbar';
import loginButton from './components/Auth/auth';
import authHelpers from './components/helpers/authHelpers';
import tasksPage from './components/TasksPage/tasksPage';
import showAddInput from './components/AddEditTasks/addEditTasks';

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  navbar();
  loginButton();
  authHelpers.checkLoginStatus(tasksPage);
  $('#show-task-input').on('click', showAddInput);
};

initializeApp();
