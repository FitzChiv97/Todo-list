'use strict';

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();
//get todoList from localStorage and put in on the page

document
  .querySelector('.js-add-button')
  .addEventListener('click', addTodo);

document
  .querySelector('.js-name-input')
  .addEventListener('keydown', (event) => checkEventKey(event));


function checkEventKey(event) {
  if (event.key === 'Enter') return addTodo();
}

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const inputValue = inputElement.value;
  //get text from a textbox

  todoList.push({taskName: inputValue, date: '', id: genereateID()});
  localStorage.setItem('todoList', JSON.stringify(todoList));
  console.log(todoList);
  //save input value into todoList and localStorage 

  inputElement.value = '';  
  //reset the text in the textbox

  renderTodoList();
}


function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(todoObject => {
    const htmlElement = `
      <p id="${todoObject.id}">
        ${todoObject.taskName}
        ${todoObject.date}
        <button class="js-delete-button">Delete</button>
      </p>
    `;  

    todoListHTML += htmlElement;
  })
  //generate HTML block for each todoList element

  document
    .querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  /*
  rewriting <div>'s value, not adding to it.
  that's why the todoList values aren't duplicated each time.
  */

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach(button => button.addEventListener('click', (event) => deleteTask(event)));
  //find & add deleteEvent to all deleteButtons
}


function deleteTask(event) {
  let taskID = event.target.parentElement.id;
  //get taskID from delete button's parent element 

  const taskIndex = todoList.findIndex(task => task.id === taskID);
  todoList.splice(taskIndex, 1);
  //find taskIndex in todoList and remove task from array

  event.target.parentElement.remove();
  localStorage.setItem('todoList', JSON.stringify(todoList));
  //remove <p> element from the page & update localStorage
}

function genereateID() {
  return Math.random().toString(16).slice(-5);
}
