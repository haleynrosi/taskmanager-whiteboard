

// window.addEventListener('load', (e)=>{
//     axios.get('http://localhost:3000/taskboardhome', {

//     })
// })


//function for name at the top - once pressed enter it should do a request that updates the taskOwner in taskboard
let taskOwnerName = document.getElementById('taskOwnerInput');
let taskManagerHeader = document.getElementById('taskManagerHeader')
taskOwnerName.value = 'Name';
taskOwnerName.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        console.log(taskOwnerName.value)
        axios.put('http://localhost:3000/taskmanagerhome', {
            taskBoardOwner: taskOwnerName.value
        })
    }
})


//creating the input/form for a new task list
const newTaskButton = document.getElementById('newTaskListButton'); //access add button
const newTaskListDiv = document.getElementById('newTaskListDiv'); //access empty div under create new task list
const taskListContainer = document.createElement('div'); //create div for task list
taskListContainer.className = 'taskListContainer'; //gave taskListContainer a class for styling
const submitTaskListButton = document.createElement('button');
submitTaskListButton.innerHTML = 'Add To Task Board';
submitTaskListButton.className = 'btn-light border-2';
submitTaskListButton.id = 'submitTaskListButton';
submitTaskListButton.type = 'submit';
let inputTaskName = document.createElement('input')



//button that creates form for task 
newTaskButton.addEventListener('click', (e) => {
    let inputTaskForm = document.createElement('form'); //create form for tasklist;
    inputTaskForm.className = 'inputTaskListForm';
    let inputTaskName = document.createElement('input'); //input for task list name;
    inputTaskName.placeholder = "Name Task Here"; //make placeholder in input
    inputTaskName.type = 'text'; //type of input it will take
    let newTask = document.createElement('input');
    let newTaskDueDate = document.createElement('input');


    function createNewTask() {
        inputTaskForm.className = 'inputTaskListForm';
        newTask.type = 'text';
        newTask.placeholder = 'Task Description';
        newTaskDueDate.value = 'string';
        newTaskDueDate.type = 'date';
        inputTaskForm.appendChild(newTask);
        inputTaskForm.appendChild(newTaskDueDate);

    }

    inputTaskName.addEventListener('keydown', (e) => {
        if (e.code == 'Enter') {
            console.log('entered');
            createNewTask();
            taskListContainer.appendChild(submitTaskListButton);
        }
    })


//function that makes a get request and fills in the current task input fields with the task clicked 
    function addCurrentTask(){
        axios.get('http://localhost:3000/taskmanager/:currenttask').then(response => {
            console.log(response.data.results)
        });
    }

    //this is the post request that happens when you add to task board - adds new task to task table in db

    let newTaskNote = 1;

    submitTaskListButton.addEventListener('click', (e) => {
        axios.post('http://localhost:3000/taskboardhome', {
            taskName: inputTaskName.value, taskDescription: newTask.value, taskDueDate: newTaskDueDate.value,
            taskBoardId: 1
        })

        const taskBoardContainer = document.getElementById('taskBoardContainer');
        const taskNote = document.createElement('div');
        const taskNoteAnchor = document.createElement('a');
        taskNote.id = 'taskNote' + newTaskNote++;

        taskNoteAnchor.addEventListener('click', (e) => {
            currentTask()
            addCurrentTask()
        })
        taskNoteAnchor.textContent = inputTaskName.value;
        

        taskNote.className = 'taskNote';
        taskNote.appendChild(taskNoteAnchor)
        taskBoardContainer.appendChild(taskNote);
        console.log('button clicked!');


    })

    inputTaskForm.appendChild(inputTaskName); //put form into container
    taskListContainer.appendChild(inputTaskForm)
    newTaskListDiv.appendChild(taskListContainer);

})


//input current task info into form function
// function addCurrentTask(){
//     axios.get('http://localhost:3000/taskmanager/:currenttask').then(response => {
//         response.json()
//     }).then(data =>{
//         currentTaskForm.elements.currentTaskName.value = data.currentTaskName;
//         currentTaskForm.elements.currentTaskDes.value = data.currentTaskDescription;
//         currentTaskForm.elements.currentTaskDate.value = data.currenTaskDueDate;

//     }).catch(error => console.error(error));
// }



//create current task form function

const currentTaskForm = document.createElement('form');

function currentTask() {
    let currentTask = document.getElementById('currentTaskId');
    currentTaskForm.id = 'currentTaskForm';
    let currentTaskName = document.createElement('input');
    currentTaskName.id= 'currentTaskName';
    currentTaskName.value = 'Name';
    let currentTaskDescription = document.createElement('input');
    currentTaskDescription.id = 'currentTaskDes';
    currentTaskDescription.value = 'Name';
    let currentTaskDate = document.createElement('input');
    currentTaskDate.id= 'currentTaskDate';
    let deleteCurrentTaskButton = document.createElement('button');
    currentTaskDate.value = 'date';
    deleteCurrentTaskButton.className = 'btn-light border-2';
    deleteCurrentTaskButton.innerText = 'Delete Current Task';
    currentTaskForm.className = 'currentTask';
    deleteCurrentTaskButton.addEventListener('click', (e) => {
        axios.delete('http:localhost:3000/taskmanager/')
    })
    
    
    currentTaskForm.appendChild(currentTaskName);
    currentTaskForm.appendChild(currentTaskDescription);
    currentTaskForm.appendChild(currentTaskDate);
    currentTask.appendChild(currentTaskForm);
    currentTask.appendChild(deleteCurrentTaskButton);


}





