const taskList = document.getElementById('status');
const taskRow = document.getElementById('taskBody');
const newTask = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const blank = /^\s+$/;
const tasks = [];

const reset = () => {
  taskRow.innerHTML = '';
}

const setTask = (id, comment) => {
  return {
    id,
    comment
  }
}

const displayNewTask = () => {
  tasks.forEach((task, index) => {
    createRow();
    insertValue(task);
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

const insertValue = (taskValue) => {
  taskRow.lastElementChild.firstElementChild.textContent = taskValue.id;
  taskRow.lastElementChild.children[1].textContent = taskValue.comment;
}

const createID = (addedRow, idNum) => {
  const newID = document.createElement('td');
  newID.textContent = tasks[idNum].id;
  addedRow.appendChild(newID);
}

const createTask = (addedRow, taskNum) => {
  const newTask = document.createElement('td');
  newTask.textContent = tasks[taskNum - 1].comment;
  addedRow.appendChild(newTask);
}

const createStatusButton = (statusColumn) => {
  ButtonWorking(statusColumn);
  ButtonRemove(statusColumn);
}

const ButtonWorking = (tdArea) => {
  const createButtonWorking = document.createElement('button');
  createButtonWorking.id = 'working';
  createButtonWorking.textContent = '作業中';
  tdArea.appendChild(createButtonWorking);
}

const ButtonRemove = (tdArea) => {
  const createButtonRemove = document.createElement('button');
  createButtonRemove.id = 'remove';
  createButtonRemove.textContent = '削除';
  tdArea.appendChild(createButtonRemove);
}

const addTask = (inputTask) => {
  tasks.push(setTask(tasks.length, inputTask));
  displayNewTask();
}

addButton.addEventListener('click', () => {
   if((newTask.value !== '') && (blank.test(newTask.value) === false)) {
    reset();
    addTask(newTask.value);
   }
});