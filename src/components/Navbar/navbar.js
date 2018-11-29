import $ from 'jquery';
import './navbar.scss';
import firebase from 'firebase/app';
import 'firebase/auth';
import todo from './2do.png';

// Navbar Events //
const navbarEvents = () => {
  $('.nav-link').on('click', (e) => {
    console.log(e.target.id);
    if (e.target.id === 'navbar-button-logout') {
      firebase.auth().signOut().then(() => {
        console.log('you logged out');
      }).catch((err) => {
        console.error('you are still logged in', err);
      });
    } else if (e.target.id === 'navbar-button-todo') {
      $('#auth').hide();
      $('#tasks').show();
      $('#tasks-container').show();
      $('#completed-tasks').show();
      $('#button-container').hide();
    } else {
      $('#auth').show();
      $('#tasks').hide();
      $('#button-container').hide();
      $('#tasks-container').hide();
      $('#completed-tasks').hide();
    }
  });
};

// NavBar Builder //
const createNavbar = () => {
  const domString = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#"><img src="${todo}"/></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a id="navbar-button-auth" class="nav-link">Authentication</a>
          </li>
          <li class="nav-item">
            <a id="navbar-button-tasks" class="nav-link">To-Do</a>
          </li>
          <li class="nav-item">
          <a id="navbar-button-logout" class="nav-link">Logout</a>
        </li>
        </ul>
      </div>
    </nav>
  `;
  console.log('hey', domString);
  $('#navbar').html(domString);
  navbarEvents();
};

export default createNavbar;
