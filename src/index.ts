// Select Elements
const submitBtn = document.querySelector('.todo-btn') as HTMLButtonElement;
const toDoInput = document.querySelector('.todo-input') as HTMLInputElement;
const toDoForm = document.querySelector('.todo-form') as HTMLFormElement;
const toDoList = document.querySelector('.todo-list') as HTMLLIElement;
const deleteAllBtn = document.querySelector('.todo-delete-all') as HTMLButtonElement;

// Handle Submit
const handleSubmit = (e:Event) => {

    e.preventDefault();

    // 1 - Create new task Obj
    const newTask: Task = {
        id: Math.random() * 16,
        task: toDoInput.value,
        completed: false,
        createdOn: new Date()
    }

    // Add new task to the list
    tasks.push(newTask);
    // Save to local storage
    saveList();

    // Add new task
    addNewTask(newTask);

    // Reset input
    toDoInput.value = "";

};

// Task interface
interface Task {
    id: number,
    task: string,
    completed: boolean,
    createdOn: Date
};

// List of tasks
const tasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]');
console.log(tasks);

//Append tasks to the DOM on start
window.addEventListener('DOMContentLoaded', ()=>{
    tasks.forEach(x => addNewTask(x));
});

// Add new task Fn
const addNewTask = (newTask: Task) =>{

    const newLi = document.createElement('li');
    const newLabel = document.createElement('label');
    newLabel.append(newTask.task);
    const checkB = document.createElement('input');
    checkB.type = 'checkbox';
    checkB.checked = newTask.completed;
    // Add checkbox event listener
    checkB.addEventListener('change', ()=>{
        console.log('checked')
        newTask.completed = checkB.checked;
        // Save list
        saveList();
    });
    // Append new task
    newLi.append(checkB, newLabel);
    toDoList.prepend(newLi);
}

// Save tasks Fn
const saveList = () =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Delete all Fn
const clearList = () =>{
    tasks.length = 0;
    saveList();
    toDoList.innerHTML = "";
}
deleteAllBtn.onclick = () => clearList();

// Add form event listener
toDoForm.addEventListener('submit', e => handleSubmit(e));