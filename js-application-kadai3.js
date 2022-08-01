const taskList = document.getElementById('status');
const taskRow = document.getElementById('taskBody');
const newTask = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const removeButtons = document.getElementsByClassName('p-status__remove');
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
    insertValue(index, task);
    createStatusButton(taskRow.lastElementChild.children[2]); 
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

const insertValue = (id, taskValue) => {
  taskRow.lastElementChild.firstElementChild.textContent = id;
  taskRow.lastElementChild.children[1].textContent = taskValue.comment;
}

const createStatusButton = (statusColumn) => {
  buttonWorking(statusColumn);
  buttonRemove(statusColumn);
}

const buttonWorking = (tdArea) => {
  const createButtonWorking = document.createElement('button');
  createButtonWorking.id = 'working';
  createButtonWorking.textContent = '作業中';
  tdArea.appendChild(createButtonWorking);
}

const buttonRemove = (tdArea) => {
  const createButtonRemove = document.createElement('button');
  createButtonRemove.className = 'p-status__remove';
  createButtonRemove.textContent = '削除';
  tdArea.appendChild(createButtonRemove);
}

const addTask = (inputTask) => {
  tasks.push(setTask(inputTask));
  displayNewTaskList();
}

const taskListCheck = () => {
  for(let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', () => {
      taskRemove(i);
    });
  } 
}

const taskRemove = (taskId) => {
  tasks.splice(taskId, 1);
  reset();
  displayNewTaskList();
  taskListCheck();
}

addButton.addEventListener('click', () => {
   if((newTask.value !== '') && (blank.test(newTask.value) === false)) {
    reset();
    addTask(newTask.value);
    taskListCheck();
   }
});