
//Define UI Vars

const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.getElementById('filter');
const taskInput = document.getElementById("task");

//Load all event listeners
loadEventListeners();

function loadEventListeners(){

    //DOM load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event
    filter.addEventListener('keyup', filterTasks);

};

//Get Tasks from LS
function getTasks(){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        //Add Class
        li.className = 'collection-item';
        //Create text node and append to the li
        li.appendChild(document.createTextNode(task));
        //Create new link element 
        const link = document.createElement('a');
        //Add class
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></li>';
        //Append the link to li
        li.appendChild(link);
        //Append the li to the ul
        taskList.appendChild(li);

    });
}


function addTask(e){

    if(taskInput.value === ''){
        alert('Add a task please');
    }
    //Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element 
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></li>';
    //Append the link to li
    li.appendChild(link);
    //Append the li to the ul
    taskList.appendChild(li);

    //Store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value='';


    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You Sure?')){
        e.target.parentElement.parentElement.remove();

        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    } 
}

function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task)
        tasks.splice(index, 1);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks(){
    taskList.innerHTML = '';

    //Alternative way(faster way)
    // while (taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // }

    //Clear tasks from local storage
    clearTasksFromLocalStorage();
}


//The function to clear tasks from local storage
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
    

}