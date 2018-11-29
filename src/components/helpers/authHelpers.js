import firebase from 'firebase/app';
import 'firebase/auth';
import $ from 'jquery';

const checkLoginStatus = (initializeTasksPage) => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user.displayName);
    if (user) {
      $('#tasks').show();
      $('#auth').hide();
      $('#navbar-button-auth').hide();
      $('navbar-button-tasks').show();
      $('navbar-button-logout').show();
      initializeTasksPage();
    } else {
      $('#tasks').hide();
      $('#auth').show();
      $('#navbar-button-auth').show();
      $('navbar-button-tasks').hide();
      $('navbar-button-logout').hide();
    }
  });
};

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default { checkLoginStatus, getCurrentUid };
