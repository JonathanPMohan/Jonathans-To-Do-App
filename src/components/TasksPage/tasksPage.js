import $ from 'jquery';
import './tasksPage.scss';
import tasksData from '../data/taskGetter';
import authHelpers from '../helpers/authHelpers';

const printAllTasks = (tasksArray) => {
  let domString = '';
  domString += '<h5 class="header text-center">Tasks </h5>';
  tasksArray.forEach((task) => {
    if (task.isCompleted === false) {
      domString += `<div class="input-group-text task d-flex">
        <input type="checkbox">
        <h4 class="task-desc m-1" data-task-id=${task.id}>${task.task}</h4>
         <input class="edit-button pt-1 ml-2" data-edit-id=${task.id} type="image" src="https://image.flaticon.com/icons/svg/230/230330.svg" width="25px" height="45px"></input>
         <input class="delete-button pt-1" data-delete-id=${task.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
            </div>`;
      $('#tasks').html(domString);
    }
  });
};

const printCompletedTasks = (tasksArray) => {
  let domString = '';
  domString += '<h5 class="header text-center">Completed Tasks </h5>';
  tasksArray.forEach((task) => {
    if (task.isCompleted === true) {
      domString += `<div class="input-group-text task d-flex">
        <input type="checkbox">
        <h4 class="task-desc m-1" data-task-id=${task.id}>${task.task}</h4>
         <input class="delete-button pt-1" data-delete-id=${task.id} type="image" src="https://image.flaticon.com/icons/svg/248/248953.svg" width="30px" height="50px"></input>
            </div>`;
      $('#completed-tasks').html(domString);
    }
  });
};

const tasksPage = () => {
  const uid = authHelpers.getCurrentUid();
  tasksData.getAllTasks(uid)
    .then((tasksArray) => {
      printAllTasks(tasksArray);
      printCompletedTasks(tasksArray);
    }).catch((error) => {
      console.error('error in getting tasks', error);
    });
};

const gettingTaskFromList = (iscompleted, elementToUpdate) => {
  const task = {
    task: $(elementToUpdate).text(),
    isCompleted: iscompleted,
  };
  return task;
};

const completedTask = (e) => {
  const element = e.target;
  element.classList.toggle('checked');
  const iscompleted = $(element).hasClass('checked');
  const elementToUpdate = $(e.target).siblings('p')[0];
  const idToUpdate = elementToUpdate.dataset.taskId;
  const elementToDelete = $(e.target).next().next().children('input')[0];
  const idToDelete = elementToDelete.dataset.deleteId;
  const updatedtaskObject = gettingTaskFromList(iscompleted, elementToUpdate);
  tasksData.updateSingleTask(updatedtaskObject, idToUpdate)
    .then(() => {
      if (iscompleted) {
        const taskToMove = $(e.target).closest('.task').text();
        $('#completed-tasks').append(`<div class="completed-task-text" id="${idToUpdate}-done">${taskToMove} <input class="delete-button-completed" data-completetask-id="${idToDelete}"type="image" src="https://cdn1.iconfinder.com/data/icons/color-bold-style/21/56-512.png" width="20px"></input></div>`);
        $(elementToUpdate).css('text-decoration', 'line-through');
      } else {
        let incompleteTaskId = '#';
        incompleteTaskId += idToUpdate;
        incompleteTaskId += '-done';
        $(incompleteTaskId).remove();
        $(elementToUpdate).css('text-decoration', 'none');
      }
    }).catch((error) => {
      console.error(error);
    });
};

const initializeTasksPage = () => {
  tasksPage();
};

$('body').on('click', 'input[type=checkbox]', completedTask);

// Delete from Open Tasks
const deleteTask = (e) => {
  const idToDelete = e.target.dataset.deleteId;
  tasksData.deleteTask(idToDelete)
    .then(() => {
      tasksPage();
    }).catch((error) => {
      console.error(error);
    });
};

$('body').on('click', '.delete-button', deleteTask);

// Delete from completed task and opentask
$('body').on('click', '.delete-button-completed', (e) => {
  const elementFromCompletedTask = e.target.parentNode;
  const idTodeleteCompleteTask = e.target.dataset.completetaskId;
  const idToOpenTask = document.querySelectorAll(`[data-task-id='${idTodeleteCompleteTask}']`)[0].parentElement;
  tasksData.deleteTask(idTodeleteCompleteTask)
    .then(() => {
      $(idToOpenTask).remove();
      $(elementFromCompletedTask).remove();
    }).catch((error) => {
      console.error(error);
    });
});

export default initializeTasksPage;
