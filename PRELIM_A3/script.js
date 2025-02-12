
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const task = taskInput.value.trim();
        if (!task) {
            alert('Task cannot be empty!');
            return;
        }
        
        const listItem = createTaskElement(task);
        taskList.appendChild(listItem);
        saveTasks();
        taskInput.value = '';
    }

    function createTaskElement(task) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        listItem.innerHTML = `
            <span class="task-text">${task}</span>
            <div>
                <button class="btn btn-sm btn-secondary edit-button">Edit</button>
                <button class="btn btn-sm btn-success done-button">Done</button>
                <button class="btn btn-sm btn-danger delete-button">Delete</button>
            </div>
        `;
        return listItem;
    }

    taskList.addEventListener('click', (e) => {
        const listItem = e.target.closest('li');
        if (!listItem) return;

        if (e.target.classList.contains('delete-button')) {
            listItem.remove();
            saveTasks();
        } else if (e.target.classList.contains('done-button')) {
            listItem.classList.toggle('list-group-item-success');
            const taskTextElement = listItem.querySelector('.task-text');
            taskTextElement.style.textDecoration = listItem.classList.contains('list-group-item-success') ? 'line-through' : 'none';
            saveTasks();
        } else if (e.target.classList.contains('edit-button')) {
            editTask(listItem);
        }
    });

    function editTask(listItem) {
        const taskTextElement = listItem.querySelector('.task-text');
        const newTask = prompt('Edit your task:', taskTextElement.textContent);
        if (newTask !== null && newTask.trim() !== '') {
            taskTextElement.textContent = newTask.trim();
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.list-group-item').forEach((item) => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                done: item.classList.contains('list-group-item-success')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(({ text, done }) => {
            const listItem = createTaskElement(text);
            if (done) {
                listItem.classList.add('list-group-item-success');
                listItem.querySelector('.task-text').style.textDecoration = 'line-through';
            }
            taskList.appendChild(listItem);
        });
    }
});
