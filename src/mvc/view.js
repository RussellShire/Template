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
      const title = document.createElement('h1');
      title.textContent = 'Task List';
      title.classList.add('title');

      document.body.appendChild(title);
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
      formButton.classList.add('form-button');

      form.appendChild(formButton);

      document.body.appendChild(form);

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
          const newCompleteBtn = document.createElement('button');
          newCompleteBtn.setAttribute('id', `button-${newUuid}`);
          newCompleteBtn.classList.add('completed-button');
          newCompleteBtn.textContent = 'x';

          // event listener for task completed button
          const completedButtonPress = (ev) => {
            console.log(`controller completedButtonPress, uuid: ${newUuid}`);
            newCreatedTask.classList.add('task-completed');
            controller.taskMarkedAsCompleted(newUuid);
          };

          newCompleteBtn.addEventListener('click', (ev) =>
            completedButtonPress(ev),
          );

          // Adding everything to the document
          newCreatedTask.appendChild(newCompleteBtn);

          const createdTaskList = document.querySelector('.task-list');
          createdTaskList.appendChild(newCreatedTask);
        }
      });
    } else {
      // else if there is no list then create one

      const listForTasks = document.createElement('ul');
      listForTasks.classList.add('task-list');
      document.body.appendChild(listForTasks);
    }
  }

  renderResetButton(taskList, controller) {
    // add reset button
    if (document.querySelector('.reset-button') === null) {
      // IF STATEMENT
      const resetButton = document.createElement('button');
      resetButton.classList.add('reset-button');
      resetButton.textContent = 'reset';
      document.body.appendChild(resetButton);

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

  render(taskList, controller) {
    // /*Renders the description of each task on the tasklist alongside a button to mark the task as completed.
    // Completed tasks are rendered with a strikethrough.*/

    confetti.create(document.getElementById('canvas'), {
      resize: true,
      useWorker: true,
    })({ particleCount: 200, spread: 200 });

    // QUESTION FOR GRAHAM: I've used a few if statements to check if code already exists before rerendering it,
    // but I think if statements are icky? Any elegant alternative solutions?

    console.log('view render function');
    console.dir(controller);

    this.renderTitle();

    this.renderForm(controller);

    this.renderTasks(taskList, controller);

    this.renderResetButton(taskList, controller);
  }
}
