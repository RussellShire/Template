import confetti from 'canvas-confetti';

export default class View {
  constructor() {
    // DOM elements
    this.submitButton = document.getElementById('submit');
    this.taskList = document.getElementById('task-list');
    this.taskInput = document.getElementById('new-task');
  }

  hello() {
    return 'Hello, I am the view';
  }

  renderTitle() {
    if (document.querySelector('.title') === null) {
      // IF STATEMENT
      //Title Render
      const titleDiv = document.createElement('div')
      titleDiv.classList.add('titleDiv')

      const title = document.createElement('h1');
      title.textContent = 'My Task List';
      title.classList.add('title');

      titleDiv.appendChild(title);

      const container = document.querySelector('.container')
      container.appendChild(titleDiv);
    }
  }

  renderForm(controller) {
    console.log('view render form function');
    console.dir(controller);

    if (document.querySelector('.form') === null) {
      // IF STATEMENT
      const form = document.createElement('form');
      form.classList.add('form');

      //input box
      const formInput = document.createElement('input');
      formInput.setAttribute('type', 'text');
      formInput.setAttribute('name', 'taskInput');
      formInput.setAttribute('placeholder', 'What do you need to do today?');
      formInput.classList.add('form-input');

      form.appendChild(formInput);

      // button
      const formButton = document.createElement('button');
      formButton.setAttribute('type', 'submit');
      formButton.textContent = 'Save';
      formButton.classList.add('form-button', 'button-styling');

      form.appendChild(formButton);

      // error message
      const errorMessage = document.createElement('div');
      errorMessage.classList.add('error-message');
      errorMessage.setAttribute('id', 'error-message');

      form.appendChild(errorMessage);

      const container = document.querySelector('.container')
      container.appendChild(form);

      const saveTask = (ev) => {
        const newTaskDescription = formInput.value;
        form.reset(); // clear the form
        ev.preventDefault(); // stops submit via html
        controller.newTaskRequested(newTaskDescription);
        // console.log(newTaskDescription)
      };

      form.addEventListener('submit', (ev) => saveTask(ev));
    }
  }

  renderTasks(taskList, controller) {
    if (document.querySelector('.task-list') != null) {
      // IF STATMENT if there already a list then map through tasklist and create items

      console.log('view renderTasks taskList');
      console.log(taskList);

      taskList.forEach((task) => {
        const newCreatedTask = document.createElement('li');
        const newUuid = task[0];

        if (document.getElementById(newUuid) === null) {
          // IF STATEMENT checks if task already exists and skips it if so
          newCreatedTask.setAttribute('id', newUuid);
          newCreatedTask.classList.add('task');
          newCreatedTask.textContent = task[1].description;

          // add task completed button

          // QUESTION FOR GRAHAM: Is fontawesome a dependency, I didn't need to install anything through node
          const newCompleteBtn = document.createElement('i');
          newCompleteBtn.classList.add('fa-solid', 'fa-circle-dot', 'completed-button');
          newCompleteBtn.setAttribute('id', `button-${newUuid}`);

          // event listener for task completed button
          const completedButtonPress = (ev) => {
            console.log(`controller completedButtonPress, uuid: ${newUuid}`);

            // Ternary opertator to toggle between applying and removing task-completed class which adds strike through
            const task = taskList.filter((task) => task[0] === newUuid);
            if(task[0][1].isCompleted) {
              newCreatedTask.classList.remove('task-completed')
              newCompleteBtn.classList.remove('fa-circle-check')
              newCompleteBtn.classList.add('fa-circle-dot')
              } else {
              newCreatedTask.classList.add('task-completed')
              newCompleteBtn.classList.remove('fa-circle-dot')
              newCompleteBtn.classList.add('fa-circle-check')
              }

            // Sends uuid to update the Map
            controller.taskMarkedAsCompleted(newUuid);
          };

          newCompleteBtn.addEventListener('click', (ev) =>
            completedButtonPress(ev),
          );

          // Adding everything to the document
          // newCreatedTask.appendChild(newCompleteBtn);
          const taskContainer = document.createElement('span')
          taskContainer.classList.add('task-container')
          
          taskContainer.appendChild(newCompleteBtn);
          taskContainer.appendChild(newCreatedTask);

          const createdTaskList = document.querySelector('.task-list');
          createdTaskList.appendChild(taskContainer);
        }
      });
    } else {
      // else if there is no list then create one

      const listForTasks = document.createElement('ul');
      listForTasks.classList.add('task-list');

      const container = document.querySelector('.container')
      container.appendChild(listForTasks);
    }
  }

  renderResetButton(taskList, controller) {
    // add reset button
    if (document.querySelector('.reset-button') === null) {
      // IF STATEMENT
      const resetButton = document.createElement('button');
      resetButton.classList.add('reset-button', 'button-styling');
      resetButton.textContent = 'reset all';

      const bottomButtons = document.querySelector('.bottom-button-container');
      bottomButtons.appendChild(resetButton);
      
      // event listener for reset button
      const resetButtonPress = (ev) => {
        console.log(`controller resetButtonPress`);

        const createdTaskList = document.querySelector('.task-list');

        while (createdTaskList.hasChildNodes()) {
          // Clears the rendering of tasks
          createdTaskList.removeChild(createdTaskList.firstChild);
        }

        controller.clearListRequested(); // Actually goes to clear the map in the model so it doesn't rerender
      };

      resetButton.addEventListener('click', (ev) => resetButtonPress(ev));
    }
  }

  renderRemoveCompletedButton(taskList, controller) {
    // add remove completed button
    if (document.querySelector('.remove-completed-button') === null) {
      // IF STATEMENT
      const removeCompletedButton = document.createElement('button');
      removeCompletedButton.classList.add('remove-completed-button', 'button-styling');
      removeCompletedButton.textContent = 'remove completed';

      const bottomButtons = document.querySelector('.bottom-button-container');
      bottomButtons.appendChild(removeCompletedButton);

      // event listener for reset button
      const removeCompletedButtonPress = (ev) => {
        console.log(`controller removeCompletedButtonPress`);

        const createdTaskList = document.querySelector('.task-list');

        while (createdTaskList.hasChildNodes()) {
          // Clears the rendering of tasks
          createdTaskList.removeChild(createdTaskList.firstChild);
        }

        controller.clearCompletedRequested(); // Actually goes to clear the map in the model so it doesn't rerender
      };

      removeCompletedButton.addEventListener('click', (ev) =>
        removeCompletedButtonPress(ev),
      );
    }
  }

  render(taskList, controller) {
    // /*Renders the description of each task on the tasklist alongside a button to mark the task as completed.
    // Completed tasks are rendered with a strikethrough.*/

    // confetti.create(document.getElementById('canvas'), {
    //   resize: true,
    //   useWorker: true,
    // })({ particleCount: 200, spread: 200 });

    // QUESTION FOR GRAHAM: I've used a few if statements to check if code already exists before rerendering it,
    // but I think if statements are icky? Any elegant alternative solutions?

    console.log('view render function');
    console.dir(controller);

    if (document.getElementById('container') === null) { // IF STATEMENT
    const container = document.createElement('span')
    container.classList.add('container')
    container.setAttribute('id', 'container')
    document.body.appendChild(container)
    }

    this.renderTitle();

    this.renderForm(controller);

    this.renderTasks(taskList, controller);

    if (document.querySelector('.bottom-button-container') === null) { // IF STATEMENT
    const bottomButtons = document.createElement('span')
    bottomButtons.classList.add('bottom-button-container')
    container.appendChild(bottomButtons)
    }

    this.renderResetButton(taskList, controller);

    this.renderRemoveCompletedButton(taskList, controller);
  }
}
