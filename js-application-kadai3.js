const taskList = document.getElementById('status');
const taskRow = document.getElementById('taskBody');
const newTask = document.getElementById('newTask');
const addButton = document.getElementById('addButton');
const removeButtons = document.querySelectorAll('.p-button__remove');
const workingButtons = document.getElementsByClassName('p-button__working');
const radioButtons = document.querySelectorAll('.p-radio-button');
const arrayRadioButtons = Array.from(radioButtons);

const blank = /^\s+$/;
const tasks = [];

const createRow = () => {
  const newRow = document.createElement('tr');
  taskRow.append(newRow);
  for(let i = 0; i < 3 ; i++) {
    createColumn(newRow);
  }
}

const createColumn = (addedRow) => {
  const newColumn = document.createElement('td');
  addedRow.appendChild(newColumn);
}

const insertIdAndTask = (id, taskValue) => {
  taskRow.lastElementChild.firstElementChild.textContent = id;
  taskRow.lastElementChild.children[1].textContent = taskValue;
}

const createWorkingButton = (taskNumber, tdArea) => {
  const workingButton = document.createElement('button');
  workingButton.className = 'p-button__working';
  workingButton.textContent = tasks[taskNumber].status;
  tdArea.appendChild(workingButton);
  workingButton.addEventListener('click', () => {
    changeTaskStatus(taskNumber, workingButton);
    displayTargetTaskList();
  });
}

const changeTaskStatus = (index, targetButton) => {
  if(targetButton.textContent === '作業中') {
    targetButton.textContent = '完了';
    tasks[index].status = '完了';
  } else {
    targetButton.textContent = '作業中';
    tasks[index].status = '作業中';
  }
}

const createDeleteButton = (taskNumber, tdArea) => {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'p-button__remove';
  deleteButton.textContent = '削除';
  tdArea.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    removeTask(taskNumber);
  });
}

const removeTask = (taskId) => {
  tasks.splice(taskId, 1);
  displayTargetTaskList();
}

const createTaskTable = (taskObject, taskIndex) => {
  createRow();
  insertIdAndTask(taskIndex, taskObject.comment);
  createWorkingButton(taskIndex, taskRow.lastElementChild.children[2]);
  createDeleteButton(taskIndex, taskRow.lastElementChild.children[2]); 
}

const displayTargetTaskList = () => {
  taskRow.innerHTML = '';
  let radioButtonIndex = arrayRadioButtons.findIndex(radioButton => radioButton.checked);
  if(radioButtonIndex === 0) {
    tasks.forEach((task, index) => {
      createTaskTable(task, index);
    });
  } else if(radioButtonIndex === 1) {
    tasks.forEach((task, index) => {
      if(task.status === '作業中') {
        createTaskTable(task, index);
      }
    });
  } else if(radioButtonIndex === 2) {
    tasks.forEach((task, index) => {
      if(task.status === '完了') {
        createTaskTable(task, index);
      }
    });
  }
}

radioButtons.forEach( (radioButton, index) => {
  radioButton.addEventListener('click', () => {
    displayTargetTaskList();
  });
});

const addTask = (inputTask) => {
  tasks.push({comment : inputTask, status : '作業中'});
  displayTargetTaskList();
  newTask.value = '';
}

addButton.addEventListener('click', () => {
  if((newTask.value === '') || (blank.test(newTask.value))) {
    return;
  }
  addTask(newTask.value);
});