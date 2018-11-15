import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      $('#todoList').show();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('navbar-button-todo').show();
      $('navbar-button-logout').show();
    } else {
      $('#todoList').hide();
      $('#auth').show();
      $('#navbar-button-auth').hide();
      $('navbar-button-todo').show();
      $('navbar-button-logout').hide();
    }
  });
};

export default checkLoginStatus;
