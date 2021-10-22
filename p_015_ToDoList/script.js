const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));    //******/
// console.log("localStorage.getItem('todos')", localStorage.getItem('todos'))
if (todos) {
    todos.forEach(todo => addTodo(todo));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    input.value="";
})

function addTodo(todo) {
    let todoText = input.value.trim();
    if (todo) { todoText = todo.text };

    if (todoText) {
        const todoLI = document.createElement('li');
        if (todo && todo.completed) {
            //-- from localStorage
            todoLI.classList.add('completed');
        };
        todoLI.innerText = todoText;

        //-- left click
        todoLI.addEventListener('click', () => {
            todoLI.classList.toggle('completed');
            updateLocalStorage();
        });
        //-- right click
        todoLI.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoLI.remove();
            updateLocalStorage();
        }) 
        todosUL.appendChild(todoLI);

        input.value = '';   //-- reset
        updateLocalStorage();
    }
};

function updateLocalStorage() {
    todosEl = document.querySelectorAll('li');

    const todos = [];
    todosEl.forEach(todoLI => {
        todos.push({
            text: todoLI.innerText,
            completed: todoLI.classList.contains('completed')
        })
    });

    localStorage.setItem('todos', JSON.stringify(todos));   //-- save to the local storage
};