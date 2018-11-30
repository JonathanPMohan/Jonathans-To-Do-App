import $ from 'jquery';
import tasksData from '../data/taskGetter';
import initializeTasksPage from '../TasksPage/tasksPage';
import './addEditTasks.scss';

const inputBuilder = (task) => {
  const inputField = `<div>
  <input class= "m-2" id="inputField" type="text" placeholder="Enter task here" value="${task.task}">
                      </div>`;
  return inputField;
};

const gettingTaskFromInput = () => {
  const task = {
    task: $('#inputField').val(),
    isCompleted: false,
  };
  return task;
};

const buildAddTask = () => {
  const emptyTask = {
    task: '',
  };
  let domString = '<div class="text-center m-4">';
  domString += '<h3 class="m-2 add-new-task">Add New To-Do</h3>';
  domString += inputBuilder(emptyTask);
  domString += '</div>';
  $('#addEditTask').html(domString).show();
  $('#tasksContainer').hide();
  $('#inputField').focus();
};

const addNewTask = (event) => {
  event.preventDefault();
  if (event.keyCode === 13 && event.target.value !== '') {
    const newTask = gettingTaskFromInput();
    tasksData.addNewTask(newTask)
      .then(() => {
        $('#addEditTask').html('').show();
        $('#tasksContainer').show();
        initializeTasksPage();
      }).catch((error) => {
        console.error(error);
      });
  }
};

const showEditInput = (e) => {
  const idToEdit = e.target.dataset.editId;
  tasksData.getSingleTask(idToEdit)
    .then((singleTask) => {
      let domString = '<div class="text-center m-4">';
      domString += '<h3 class="m-2 edit-task-heading">Edit To-Do</h3>';
      domString += inputBuilder(singleTask);
      domString += '</div>';
      $('#addEditTask').html(domString).show();
      $('#tasksContainer').hide();
      $('#inputField').focus();
    }).catch((error) => {
      console.error(error);
    });
};

const taskUpdate = (e) => {
  const updateTask = gettingTaskFromInput();
  const taskId = e.target.dataset.singleEditId;
  tasksData.updateSingleTask(updateTask, taskId)
    .then(() => {
      $('#addEditTask').html('').hide();
      $('#tasksContainer').show();
      initializeTasksPage();
    }).catch((error) => {
      console.error(error);
    });
};

const bindEvents = () => {
  $('body').on('click', '#triggerTaskInput', buildAddTask);
  $('body').on('keyup', '#inputField', addNewTask);
  $('body').on('click', '.editButton', showEditInput);
  $('body').on('click', '#edit-task', taskUpdate);
};

export default { bindEvents };
