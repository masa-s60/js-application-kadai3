const taskList = document.getElementById('status');
const taskRow = document.getElementById('taskBody');
const newTask = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const removeButtons = document.querySelectorAll('.p-button__remove');
const workingButtons = document.getElementsByClassName('p-button__working');
const radioButtons = document.querySelectorAll('.p-radio-button');

const blank = /^\s+$/;
const tasks = [];

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
  taskRow.lastElementChild.children[1].textContent = taskValue;
}

const createDeleteButton = (index, tdArea) => {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'p-button__remove';
  deleteButton.textContent = '削除';
  tdArea.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    removeTask(index);
  });
}

const removeTask = (taskId) => {
  tasks.splice(taskId, 1);
  taskRow.innerHTML = '';
  displayAllTaskList();
}

const createWorkingButton = (tdArea) => {
  const workingButton = document.createElement('button');
  workingButton.className = 'p-button__working';
  workingButton.textContent = '作業中';
  tdArea.appendChild(workingButton);
  workingButton.addEventListener('click', () => {
    changeTaskStatus(workingButton);
  });
}

const changeTaskStatus = (targetButton) => {
  if(targetButton.textContent === '作業中') {
    targetButton.textContent = '完了';
  } else {
    targetButton.textContent = '作業中';
  }
}

const displayAllTaskList = () => {
  tasks.forEach((task, index) => {
    createRow();
    insertIdAndTask(index, task);
    createWorkingButton(taskRow.lastElementChild.children[2]);
    createDeleteButton(index, taskRow.lastElementChild.children[2]); 
  });
  newTask.value = '';
}

const addTask = (inputTask) => {
  tasks.push(inputTask);
  displayAllTaskList();
}

const checkTaskList = () => {
  for(let i = 0; i < removeButtons.length; i++) {
    removeButtons[i].addEventListener('click', () => {
      removeTask(i);
    });
  } 
}

radioButtons.forEach( (radioButton, index) => {
  radioButton.addEventListener('click', () => {
    taskRow.innerHTML = '';
    if(index === 0) {
      displayAllTaskList();
    } else if(index === 1) {
      displayWorkingTask();
    } else if(index === 2) {
      displayCompleteTask();
    }
  });
});

addButton.addEventListener('click', () => {
  if((newTask.value === '') || (blank.test(newTask.value))) {
    return;
  }
  taskRow.innerHTML = '';
  addTask(newTask.value);
});