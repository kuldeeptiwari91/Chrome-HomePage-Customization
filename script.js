function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value;
    if (taskText) {
        const todoList = document.querySelector('.todo-list');
        const newTask = document.createElement('label');
        newTask.innerHTML = `<input type="checkbox"> ${taskText}<br>`;
        todoList.appendChild(newTask);
        taskInput.value = '';
    }
}
