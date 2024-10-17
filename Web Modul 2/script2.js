let tasks = [];
let editIndex = -1;

function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Task cannot be empty");
        return;
    }

    if (editIndex >= 0) {
        tasks[editIndex] = task;  
        editIndex = -1;
    } else {
        tasks.push(task);  
    }

    taskInput.value = "";
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";  

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task}</span>
            <div>
                <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);  
    renderTasks();
}

function editTask(index) {
    const taskInput = document.getElementById("task-input");
    taskInput.value = tasks[index];  
    editIndex = index;
}

