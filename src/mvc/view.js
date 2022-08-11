import confetti from 'canvas-confetti';

export default class View {
  constructor() {
    // DOM elements
    this.submitButton = document.getElementById('submit');
    this.taskList = document.getElementById('task-list');
    this.taskInput = document.getElementById('new-task');

    // Event listeners
    // this.submitButton.onclick = e => { // add eventlisteners onto the html rather than into class
    //     e.preventDefault()

    //     const input = this.taskInput.value

    //     this.taskInput.value = ''

    //     //this.controller.newTaskRequested(input)
    //     }
  }

  hello() {
    confetti.create(document.getElementById('canvas'), {
      resize: true,
      useWorker: true,
    })({ particleCount: 200, spread: 200 });
    return 'Hello, I am the view';
  }

  taskSubmitted() {
    console.log('clicked');
    //Has an input box for new tasks, when tasks are added passes the description to the controller.
  }

  render(taskList, controller) {
    // /*Renders the description of each task on the tasklist alongside a button to mark the task as completed.
    // Completed tasks are rendered with a strikethrough.*/
    // // use create element li
    // taskList.forEach(task => {
    //     newTask = document.createElement('li')
    //     const description = task.description
    //     newTask.textContent(description)
    //     newTask.classList.add('task')
    //     // event listener
    //     newTask.addEventListener('click', () => {
    //         this.taskCompleted(task.uuid)
    //     })
    //     document.taskList.appendChild(newElement)
    // }
    // )
    // const newElement = document.createElement('li')
    // // Render whole taskList dynamically, make each id uuid, add a button for mark completed set any marked as completed as stirkethrough
    // //maybe append element that adds a class that does strikethrough
  }

  taskCompleted(uuid) {
    // If the button that marks tasks as completed is triggered passes that task's uuid to the controller
    // Event listener that passes the uuid to the controller when dynamically created,
  }

  taskListReset() {
    // A reset button that when triggered tells the controller.
  }
}
