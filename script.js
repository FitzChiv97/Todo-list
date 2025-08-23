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

  todoList.push(inputValue);
  localStorage.setItem('todoList', JSON.stringify(todoList));
  //save input value into todoList and localStorage 

  inputElement.value = '';  
  //reset the text in the textbox

  renderTodoList();
}


function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(todo => {    
    const htmlElement = `
      <p class="js-task-name" id="${genereateID()}">
        ${todo} 
        <button class="js-delete-button">Delete</button>
      </p>
    `;
  
    todoListHTML += htmlElement;
  })
  //generate HTML for each todoList element

  document
    .querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  /*
  rewriting <div>'s value, not adding to it.
  that's why the todoList values aren't duplicated each time.
  */

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach(button => button.addEventListener('click', deleteTask));
  //find & add deleteEvent to all deleteButtons
}


function deleteTask() {
  let taskName = this.parentElement.innerText;
  taskName = taskName.slice(0, -7);
  //get todo taskName from <p> element

  const taskIndex = todoList.indexOf(taskName);
  todoList.splice(taskIndex, 1);
  //find taskIndex in todoList and remove task from there

  this.parentElement.remove();
  localStorage.setItem('todoList', JSON.stringify(todoList));
  //remove <p> element from the page & update localStorage
}

function genereateID() {
  return Math.random().toString(16).slice(-5);
}
