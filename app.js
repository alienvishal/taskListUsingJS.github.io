//Create UI Variables

const form = document.querySelector('#task-form');
const tasklist = document.querySelector('.collection');
const clrbtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All EventListerner Variables
loadEventListener();

//Calling loadEventListerner
function loadEventListener(){  

  //Getting Value from DOM to LocalStorage
  document.addEventListener('DOMContentLoaded', getItems);

  //Event Adding
  form.addEventListener('submit', addEvent);

  //Event Removing
  tasklist.addEventListener('click', removeEvent);

  //Clear Task Event
  clrbtn.addEventListener('click', clearEvent);

  //Filter the task
  filter.addEventListener('keyup', filterEvent);
}

function addEvent(e){
  //If the input feild is empty display alert message

  if(taskInput.value === ''){
    alert('Enter the value');
  }

  else{
    let tasks;
    //Create new List item 
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    //create a link for deleting values
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);

    //append li to ul
    tasklist.appendChild(li);
    //Call a function to add value in Local Storage
    addTaskToLocalStorage(taskInput.value);
    taskInput.value = '';
  }

  e.preventDefault();
}


function removeEvent(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you Sure?')){
        e.target.parentElement.parentElement.remove();
        removeFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function clearEvent(e){
  // 1 Way of Doing
  // tasklist.innerHTML = '';
  // 2 Way Of Doing
  if(confirm('Are you sure want to clear all Data?')){
    while(tasklist.firstChild){
      tasklist.removeChild(tasklist.firstChild);
      clearTaskFromLocalStorage();
    }
  }
}

function filterEvent(e){

  const filterText = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(itemList){
    const item = itemList.firstChild.textContent;

    if(item.toLowerCase().indexOf(filterText) != -1){
      itemList.style.display = 'block';
    }
    else{
      itemList.style.display = 'none';
    }
  });

}

function addTaskToLocalStorage(inputTask){
  
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(inputTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getItems(){

  let tasks;

  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    //Create new List item 
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));

    //create a link for deleting values
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></li>';
    li.appendChild(link);

    //append li to ul
    tasklist.appendChild(li);
  });
  
}

function removeFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
} 

function clearTaskFromLocalStorage(){
  localStorage.clear();
}