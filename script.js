class Task {
    constructor(title, description = '') {
        this.title = title;
        this.description = description;
        this.completed = false;
    }
}

class ToDoList {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.render();
    }

    addTask(task) {
        this.tasks.push(task);
        this.update();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.update();
    }

    toggleCompletion(index) {
        this.tasks[index].completed = !this.tasks[index].completed;
        this.update();
    }

    update() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.render();
    }

    render() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description}</p>
                </div>
                <button class="delete" data-index="${index}">Delete</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}" />
            `;
            taskList.appendChild(taskItem);
        });

        taskList.querySelectorAll('.delete').forEach(button => {
            button.onclick = (e) => this.deleteTask(e.target.getAttribute('data-index'));
        });

        taskList.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.onchange = (e) => this.toggleCompletion(e.target.getAttribute('data-index'));
        });
    }
}

const toDoList = new ToDoList();

document.getElementById('task-form').onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    if (title) {
        toDoList.addTask(new Task(title, description));
        document.getElementById('task-form').reset();
    }
};
