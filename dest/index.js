"use strict";
// Select Elements
const submitBtn = document.querySelector('.todo-btn');
const toDoInput = document.querySelector('.todo-input');
const toDoForm = document.querySelector('.todo-form');
const toDoList = document.querySelector('.todo-list');
const deleteAllBtn = document.querySelector('.todo-delete-all');
// Handle Submit
const handleSubmit = (e) => {
    e.preventDefault();
    // 1 - Create new task Obj
    const newTask = {
        id: Math.random() * 16,
        task: toDoInput.value,
        completed: false,
        createdOn: new Date()
    };
    // Add new task to the list
    tasks.push(newTask);
    // Save to local storage
    saveList();
    // Add new task
    addNewTask(newTask);
    // Reset input
    toDoInput.value = "";
};
;
// List of tasks
const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
console.log(tasks);
//Append tasks to the DOM on start
window.addEventListener('DOMContentLoaded', () => {
    tasks.forEach(x => addNewTask(x));
});
// Add new task Fn
const addNewTask = (newTask) => {
    const newLi = document.createElement('li');
    const newLabel = document.createElement('label');
    newLabel.append(newTask.task);
    const checkB = document.createElement('input');
    checkB.type = 'checkbox';
    checkB.checked = newTask.completed;
    // Add checkbox event listener
    checkB.addEventListener('change', () => {
        console.log('checked');
        newTask.completed = checkB.checked;
        // Save list
        saveList();
    });
    // Append new task
    newLi.append(checkB, newLabel);
    toDoList.prepend(newLi);
};
// Save tasks Fn
const saveList = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};
// Delete all Fn
const clearList = () => {
    tasks.length = 0;
    saveList();
    toDoList.innerHTML = "";
};
deleteAllBtn.onclick = () => clearList();
// Add form event listener
toDoForm.addEventListener('submit', e => handleSubmit(e));
