const taskList = document.getElementById('status');
const taskRow = document.getElementById('taskBody');
const newTask = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const removeButtons = document.querySelectorAll('.p-status__remove');
const workingButtons = document.getElementsByClassName('p-status__working');
document.querySelectorAll
const blank = /^\s+$/;
const tasks = [];

const reset = () => {
  taskRow.innerHTML = '';
}

const setTask = (comment) => {
  return {
    comment
  }
}

const displayNewTaskList = () => {
  tasks.forEach((task, index) => {
    createRow();
    insertIdAndTask(index, task);
    createDeleteButton(index, taskRow.lastElementChild.children[2]); 
    createWorkingButton(index, taskRow.lastElementChild.children[2]);
  });
  newTask.value = '';
}

const createRow = () => {
  const newRow = document.createElement('tr');
  taskRow.append(newRow);
  createColumn(newRow);
  createColumn(newRow);
  createColumn(newRow);
}

const createColumn = (addedRow) => {
  const newColumn = document.createElement('td');
  addedRow.appendChild(newColumn);
}

const insertIdAndTask = (id, taskValue) => {
  taskRow.lastElementChild.firstElementChild.textContent = id;
  taskRow.lastElementChild.children[1].textContent = taskValue.comment;
}

const createDeleteButton = (index, tdArea) => {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'p-status__remove';
  deleteButton.textContent = '削除';
  tdArea.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    removeTask(index);
  });
}

const createWorkingButton = (index, tdArea) => {
  const workingButton = document.createElement('button');
  workingButton.className = 'p-status__working';
  workingButton.textContent = '作業中';
  tdArea.appendChild(workingButton);
  workingButton.addEventListener('click', () => {
    workingTask(index);
  });
}

const addTask = (inputTask) => {
  tasks.push(setTask(inputTask));
  displayNewTaskList();
}

const checkTaskList = () => {
  for(let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', () => {
      removeTask(i);
    });
  } 
}

const removeTask = (taskId) => {
  tasks.splice(taskId, 1);
  reset();
  displayNewTaskList();
}

const workingTask = (taskId) => {
  // reset();
  // displayNewTaskList();
}

addButton.addEventListener('click', () => {
  if((newTask.value === '') || (blank.test(newTask.value))) {
    return;
  }
  reset();
  addTask(newTask.value);
});