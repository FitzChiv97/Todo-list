const todoList = [];

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

  inputElement.value = '';  
  //reset the text in the textbox

  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach(todo => {
    const htmlElement = `<p>${todo}</p>`;
    todoListHTML += htmlElement;
  //this is a generating HTML technique
  })

  document
    .querySelector('.js-todo-list')
    .innerHTML = todoListHTML;

  /*
  rewriting <div>'s value, not adding to it.
  that's why the todoList values aren't duplicated each time.
  */
}
