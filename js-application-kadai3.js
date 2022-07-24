const idList = document.getElementById('id');
const taskList = document.getElementById('comment');
const statusList = document.getElementById('status');
const newTask = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const blank = /\s|\t|\n/;
const tasks = [];

setTask = (id, comment) => {
  return {
    id,
    comment
  }
}

createID = (idNum) => {
  const newID = document.createElement('li');
  newID.textContent = tasks[idNum - 1].id;
  idList.appendChild(newID);
}

createTask = (taskNum) => {
  const newTask = document.createElement('li');
  newTask.textContent = tasks[taskNum - 1].comment;
  taskList.appendChild(newTask);
}

createStatusButton = () => {
  const newStatus = document.createElement('li');
  statusList.appendChild(newStatus);
  const createButtonWorking = document.createElement('button');
  createButtonWorking.id = 'working';
  createButtonWorking.textContent = '作業中';
  newStatus.appendChild(createButtonWorking);
  const createButtonRemove = document.createElement('button');
  createButtonRemove.id = 'remove';
  createButtonRemove.textContent = '削除';
  newStatus.appendChild(createButtonRemove);
}

addTask = (inputTask) => {
  tasks.push(setTask(tasks.length, inputTask));
  createID(tasks.length);
  createTask(tasks.length);
  createStatusButton();
}

addButton.addEventListener('click', () => {
   if(newTask.value !== '') {
    addTask(newTask.value);
   }
});