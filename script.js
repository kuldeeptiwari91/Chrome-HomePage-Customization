document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;
    if (taskText) {
        const todoList = document.getElementById('todo-list');
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.innerHTML = `
            <label>
                <input type="checkbox" onclick="toggleTask(this)">
                <span>${taskText}</span>
            </label>
        `;
        newTask.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            showTaskOptions(this);
        });
        todoList.appendChild(newTask);
        taskInput.value = '';
        saveTasks();
    }
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = savedTasks;
        todoList.querySelectorAll('.task').forEach(task => {
            task.addEventListener('contextmenu', function(e) {
                e.preventDefault();
                showTaskOptions(this);
            });
        });
    }
}

function saveTasks() {
    const todoList = document.getElementById('todo-list');
    localStorage.setItem('tasks', todoList.innerHTML);
}

function deleteTask(task) {
    task.remove();
    saveTasks();
}

function editTask(task) {
    const taskLabel = task.querySelector('label span');
    const newTaskText = prompt('Edit task:', taskLabel.textContent);
    if (newTaskText !== null) {
        taskLabel.textContent = newTaskText;
        saveTasks();
    }
}

function toggleTask(checkbox) {
    const taskLabel = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskLabel.style.textDecoration = 'line-through';
    } else {
        taskLabel.style.textDecoration = 'none';
    }
    saveTasks();
}

function showTaskOptions(task) {
    const options = document.createElement('div');
    options.className = 'task-options';
    options.innerHTML = `
        <button onclick="editTask(this.parentElement.parentElement)">Edit</button>
        <button onclick="deleteTask(this.parentElement.parentElement)">Delete</button>
    `;
    task.appendChild(options);
    document.addEventListener('click', function hideOptions(e) {
        if (!task.contains(e.target)) {
            options.remove();
            document.removeEventListener('click', hideOptions);
        }
    });
}

function searchWeb() {
    const query = document.getElementById('search-input').value;
    if (query) {
        window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
}
