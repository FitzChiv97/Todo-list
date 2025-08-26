'use strict';

const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
renderTodoList();
//get todoList from localStorage and put in on the page

document
  .querySelector('.js-add-button')
  .addEventListener('click', addTodo);

document
  .querySelector('.js-name-input')
  .addEventListener('keydown', (e) => checkEventKey(e));


function checkEventKey(e) {
  if (e.key === 'Enter') return addTodo();
}


function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const taskName = inputElement.value;
  //get text from the input textbox

  const dateInputElement = document.querySelector('.js-date-input');
  const dueDate = dateInputElement.value;
  //get due date from the input date 

  todoList.push({
    taskName, 
    dueDate, 
    id: genereateID(),
  });

  localStorage.setItem('todoList', JSON.stringify(todoList));
  //save input value into todoList and localStorage 

  inputElement.value = '';  
  //reset the text in the textbox

  renderTodoList();
}


function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(todoObject => {
    const { taskName, dueDate, id } = todoObject;
    //destructuring

    const htmlElement = `
      <div class="todo-list-row">
        <div>${taskName}</div>
        <div>${dueDate}</div>
        <div class="del-btn-wrapper">
          <button class="js-delete-button del-btn">Delete</button>
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
  rewriting <div>'s value, not adding to it.
  that's why the todoList values aren't duplicated each time.
  */

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach(button => button.addEventListener('click', (e) => deleteTask(e)));
  //find & add deleteEvent to all deleteButtons
}


function deleteTask(e) {
  console.log(e.target.parentElement.parentElement);

  /*
  let taskID = e.target.parentElement.id;
  //get taskID from delete button's parent element 

  const taskIndex = todoList.findIndex(task => task.id === taskID);
  todoList.splice(taskIndex, 1);
  //find taskIndex in todoList and remove task from array

  e.target.parentElement.remove();
  localStorage.setItem('todoList', JSON.stringify(todoList));
  //remove <p> element from the page & update localStorage
  */
}
 

function genereateID() {
  return Math.random().toString(16).slice(-5);
}
