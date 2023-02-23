let newTask = document.getElementById('input-task');
let addTaskButton = document.getElementById('add-task-button');
let taskList = document.getElementById('task-list');
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function updateTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function createTask(task) {
    let newLi = document.createElement('li');
    let newCheckbox = document.createElement('input');
    newCheckbox.type = 'checkbox';
    newCheckbox.checked = task.done;
    newCheckbox.addEventListener("click", () => {
        newTaskText.classList.toggle('doneTask');
        task.done = newCheckbox.checked;
        updateTasks();
    });
    let newTaskText = document.createElement('span');
    newTaskText.className = 'task';
    if (newCheckbox.checked) {
        newTaskText.className = 'task doneTask';
    }
    newTaskText.textContent = task.text;
    let newDeleteButton = document.createElement('button');
    newDeleteButton.className = 'delete-btn';
    newDeleteButton.addEventListener("click", () => {
        newLi.remove();
        let numberOfTask = tasks.indexOf(task);
        tasks.splice(numberOfTask, 1);
        updateTasks();
    });
    newLi.append(newCheckbox, newTaskText, newDeleteButton);
    taskList.append(newLi);
}

for (let task of tasks) {
    createTask(task);
}

addTaskButton.addEventListener("click", () => {
    if (newTask.value === "") {
        return;
    }
    let task = {
        text: newTask.value,
        done: false
    }
    tasks.push(task);
    updateTasks();
    createTask(task);
    newTask.value = "";
});