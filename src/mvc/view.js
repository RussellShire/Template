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
    
    if (document.querySelector('.form') === null ){ // IF STATEMENT
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
  }


  render(taskList, controller) {
    // /*Renders the description of each task on the tasklist alongside a button to mark the task as completed.
    // Completed tasks are rendered with a strikethrough.*/
    

    // QUESTION FOR GRAHAM: I've used a few if statements to check if code already exists before rerendering it, 
    // but I know if statements are icky. This is one, but there are a couple more, any elegant alternative solutions?
    if (document.querySelector('.title') === null ){
      //Title Render
      const title = document.createElement('h1')
      title.textContent = 'Task List'
      title.classList.add('title')
      
      document.body.appendChild(title)
    }
    
    console.log('view render function')
    console.dir(controller)
    
    this.renderForm(controller)
      
    if (document.querySelector('.task-list') != null ){  // IF STATMENT if there already a list then map through tasklist and create items
      
      taskList.map(task => {
        const newCreatedTask = document.createElement("li")
        const newUuid = task[0]

        if (document.getElementById(newUuid) === null){ // IF STATEMENT checks if task already exists and skips it if so
          newCreatedTask.setAttribute('id', newUuid)
          newCreatedTask.classList.add('task')
          newCreatedTask.textContent = task[1].description
          

          const newCompleteBtn = document.createElement('button')
          newCompleteBtn.setAttribute('id', `button-${newUuid}`)
          newCompleteBtn.textContent = 'x'
          
          // event listener for task completed button
          const completedButtonPress = (ev) => {
            console.log(`controller completedButtonPress, uuid: ${newUuid}`)
            newCreatedTask.classList.add('task-completed')
            controller.taskMarkedAsCompleted(newUuid)
          }

          newCompleteBtn.addEventListener('click', (ev) => completedButtonPress(ev))

          // Adding everything to the document
          newCreatedTask.appendChild(newCompleteBtn)

          const createdTaskList = document.querySelector('.task-list')
          createdTaskList.appendChild(newCreatedTask)
        }
      })
    
      } else { // if there is no list then create one
      const listForTasks = document.createElement('ul')
      listForTasks.classList.add('task-list')
      document.body.appendChild(listForTasks)
    }
  }

  taskCompleted(uuid) {
    // If the button that marks tasks as completed is triggered passes that task's uuid to the controller
    // Event listener that passes the uuid to the controller when dynamically created,
  }

  taskListReset() {
    // A reset button that when triggered tells the controller.
  }
}
