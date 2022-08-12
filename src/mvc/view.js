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

  renderForm(controller){
    console.log('view render form function')
    console.dir(controller)
    
    const form = document.createElement('form')
    form.classList.add('form')
        
    //input box
    const formInput = document.createElement('input')
    formInput.setAttribute('type', 'text')
    formInput.setAttribute('name', 'taskInput')
    formInput.setAttribute('placeholder', 'What do you need to do today?')
    formInput.classList.add('form-input')

    form.appendChild(formInput)

    // button 
    const formButton = document.createElement('button')
    formButton.setAttribute('type', 'submit')
    formButton.textContent = 'Save'
    formButton.classList.add('form-button')

    form.appendChild(formButton)

    document.body.appendChild(form)
    
    const saveTask = (ev) => {
      const newTaskDescription = formInput.value
      form.reset() // clear the form
      ev.preventDefault() // stops submit via html
      controller.newTaskRequested(newTaskDescription)
      // console.log(newTaskDescription)
    }

    form.addEventListener('submit', (ev) => saveTask(ev))
    
  }


  render(taskList, controller) {
    // /*Renders the description of each task on the tasklist alongside a button to mark the task as completed.
    // Completed tasks are rendered with a strikethrough.*/
    
    //Title Render
    const title = document.createElement('h1')
    title.textContent = 'Task List'
    title.classList.add('title')

    document.body.appendChild(title)
    
    console.log('view render function')
    console.log(JSON.stringify(controller, null, 4))
    
    this.renderForm(controller)




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
