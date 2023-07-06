const todoContainer = document.getElementById('todos');

const addTodoForm= document.getElementById('addTodoForm');
const todoInput = document.getElementById('todoInput');
let todoItems= [];
const getTodos = async () => {
  const response = await fetch('https://dummyjson.com/todos/user/14');
  const data = await response.json();
  todoItems = data.todos;
  return todoItems;

}

const createTodos = () => {
  todoContainer.innerHTML = '';
  todoItems.forEach(item => {
    const div = document.createElement('div');
    const todo = document.createElement('h4');
    const completed = document.createElement('p');
    const checkbox = document.createElement('input');
    const deleteButton = document.createElement('button');
    
    todo.innerHTML = item.todo;
    completed.innerHTML = `Completed: ${item.completed}`;
    checkbox.type = 'checkbox';
    checkbox.checked = item.completed;
    deleteButton.textContent = 'Delete';
    checkbox.addEventListener('change', () => updateTodo(item.id, checkbox.checked));
    deleteButton.addEventListener('click', () => deleteTodo(item.id));

    div.appendChild(todo);
    div.appendChild(completed);
    div.appendChild(checkbox);
    div.appendChild(deleteButton);

    div.setAttribute('key', item.id);
    div.setAttribute('class', 'todo');
    if (item.completed) {
      div.style.backgroundColor = 'white';
    } else {
      div.style.backgroundColor = 'white';
    }
    todoContainer.appendChild(div);
  });
};

const addTodo=()=> {
    const todo =todoInput.value;
fetch('https://dummyjson.com/todos/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo,
    completed: false,
    userId: 14,
  })
})
    .then(response => response.json())
    .then( response =>{todoItems.push(response);
    createTodos();
     todoInput.value='';

     })
    .catch(error => {
    console.error('Error adding todo:',error)

})


};


const updateTodo = (todoId, completed) => {
    fetch(`https://dummyjson.com/todos/14`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed,
      }),
    })
      .then(response => response.json())
      .then(response => {
        const updatedTodoIndex = todoItems.findIndex(item => item.id === todoId);
        if (updatedTodoIndex !== -1) {
          todoItems[updatedTodoIndex].completed = response.completed;
          createTodos();
        }
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };



const deleteTodo=todoId =>{
fetch('https://dummyjson.com/todos/14', {
  method: 'DELETE',
})
.then(response => response.json())
.then(() => {
    todoItems = todoItems.filter(item => item.id !== todoId);
    displayTodos();
  })
.catch(error=>console.error('Error deleting todo',error))
}



addTodoForm.addEventListener('submit', x => {
  x.preventDefault();
  addTodo();
});
getTodos()
  .then(() => {
    createTodos();
  }); 