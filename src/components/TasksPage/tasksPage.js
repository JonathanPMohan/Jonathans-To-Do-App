import $ from 'jquery';
import tasksData from '../data/taskGetter';
import './tasksPage.scss';

//  Task Card Function //
const initView = () => {
  $('#navbar').show();
  $('#todoList').hide();
  $('#tasks-container').hide();
  $('#auth').show();
};

// Print Tasks To Dom //
const createTaskCards = (tasks) => {
  let newString = '';
  // newString += '<h2 class="header text-center">To-Do List </h2>';
  tasks.forEach((task) => {
    if (task.isCompleted === false) {
      newString += `<div class="input-group-text task d-flex">
                      <input type="checkbox" id="completed">
                      <h4 class="task m-1" data-task-id=${task.id}>${task.task}</h4>
                      <input class="edit-button pt-1 ml-2" data-edit-id=${task.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="30px" height=""></input>
                      <input class="delete-button pt-1" data-delete-id=${task.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height=""></input>
                      
                      </div>`;
      $('#todoList').html(newString);
    }
  });
};

// Get Tasks From Tasks Getter //
const getTasks = () => {
  tasksData()
    .then((tasks) => {
      createTaskCards(tasks);
    })
    .catch((error) => {
      console.error({ error });
    });
};

export default { initView, getTasks };
