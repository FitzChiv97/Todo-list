'use strict';

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();
//get todoList from localStorage and put in on the page

document
  .querySelector('.js-add-button')
  .addEventListener('click', addTodo);

document
  .querySelector('.js-darkmode-btn')
  .addEventListener('click', (e) => switchDarkMode(e));

document
  .querySelector('.js-name-input')
  .addEventListener('keydown', (e) => checkEventKey(e));

document
  .querySelector('.js-name-input')
  .addEventListener('click', () => document.querySelector('.js-todo-pop-up-wrapper').innerHTML = '');

document
  .querySelector('.js-date-input')
  .addEventListener('click', () => document.querySelector('.js-date-pop-up-wrapper').innerHTML = '');

if (localStorage.getItem('darkmode')) darkmodeCheck();


function checkEventKey(e) {
  if (e.key === 'Enter') return addTodo();
}


function addTodo() {
  const nameInputElement = document.querySelector('.js-name-input');
  const taskName = nameInputElement.value;
  //get text from the input textbox

  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;
  //get due date from the input date 

  const taskInput = document.getElementById('priority-select');
  const taskPriority = taskInput.value;
  //get priority from its input

  if (!taskName) {
    const todoAlertMessage = `
      <div class="js-todo-alert pop-up-message">
        <p>Fill in the task below</p>
      </div>
    `;
    document.querySelector('.js-todo-pop-up-wrapper').innerHTML = todoAlertMessage;
    //check if todo inpit is filled
  } else if (!dueDate) {
    const dateAlertMessage = `
      <div class="js-date-alert pop-up-message">
        <p>Fill in the date below</p>
      </div>
    `;
    document.querySelector('.js-date-pop-up-wrapper').innerHTML = dateAlertMessage;
    //check if date inpit is filled
  } else {
    todoList.push({
      taskName, 
      taskPriority,
      dueDate, 
      id: genereateID(),
    });
  
    localStorage.setItem('todoList', JSON.stringify(todoList));
    //save input value into todoList array and localStorage 
  
    nameInputElement.value = '';
    dateInputElement.value = '';
    taskInput.value = 'no-priority';
    //reset the text, date, priority inputs
  
    renderTodoList();
  }
}


function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(todoObject => {
    const { taskName, dueDate, taskPriority, id } = todoObject;
    //destructuring

    const htmlElement = `
      <div class="todo-list-row">
        <div class="task-name-container"><p class="${taskPriority}">${taskName}</p></div>
        <div class="due-date-container"><p>${dueDate}</p></div>
        <div class="del-btn-wrapper"">
          <button class="js-delete-button del-btn" id="${id}">Delete</button>
        </div>
      </div>
    `;  

    todoListHTML += htmlElement;
  })
  //generate HTML block for each todoList element

  document
    .querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  /*
  rewriting <div>'s value, not adding to it. that's why the todoList values aren't duplicated each time.
  */

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach(button => button.addEventListener('click', (e) => deleteTask(e)));
  //find & add deleteEvent to all deleteButtons
}


function deleteTask(e) {
  const delBtn = e.target;
  const delBtnId = delBtn.id;
  //get id assosiated with current task from delete button 

  const taskIndex = todoList.findIndex(todoObject => todoObject.id === delBtnId);
  todoList.splice(taskIndex, 1);
  //remove current task from array by id

  e.target.parentElement.parentElement.classList.add('crossed-out');
  setTimeout(() => e.target.parentElement.parentElement.remove(), 1000);

  localStorage.setItem('todoList', JSON.stringify(todoList));
  // remove current todo-list-row & update localStorage
}
 

function genereateID() {
  return Math.random().toString(16).slice(-5);
}


function switchDarkMode(e) {
  const pageContent = document.querySelector('.js-body');

  if (pageContent.classList.contains('darkmode')) {
    pageContent.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'off');

    document.querySelector('.js-light-mode-img').classList.remove('active');
    document.querySelector('.js-dark-mode-img').classList.add('active');
    //changing dark-mode-btn svg to sun
  } else {
    pageContent.classList.add('darkmode');
    localStorage.setItem('darkmode', 'on');

    document.querySelector('.js-light-mode-img').classList.add('active');
    document.querySelector('.js-dark-mode-img').classList.remove('active');
    //changing dark-mode-btn svg to moon
  };
}


function darkmodeCheck() {
  if (localStorage.getItem('darkmode') === 'on') {
    document.querySelector('.js-body').classList.add('darkmode');
    document.querySelector('.js-light-mode-img').classList.add('active');
    document.querySelector('.js-dark-mode-img').classList.remove('active');
  }
}

function removePopUpMessage(e) {
  e.target.nextElementSibling.remove();
}