export default class View {
  renderTitle() {
    if (document.querySelector('.title') === null) {
      const titleDiv = document.createElement('div');
      titleDiv.classList.add('titleDiv');

      const title = document.createElement('h1');
      title.textContent = 'My Task List';
      title.classList.add('title');

      titleDiv.appendChild(title);

      const container = document.querySelector('.container');
      container.appendChild(titleDiv);
    }
  }

  renderForm(controller) {
    console.log('view render form function');
    console.dir(controller);

    if (document.querySelector('.form') === null) {
      const form = document.createElement('form');
      form.classList.add('form');

      //input box
      const formInput = document.createElement('input');
      formInput.setAttribute('type', 'text');
      formInput.setAttribute('name', 'taskInput');
      formInput.setAttribute('placeholder', 'What do you need to do today?');
      formInput.classList.add('form-input');

      form.appendChild(formInput);

      // add the button
      const formButton = document.createElement('button');
      formButton.setAttribute('type', 'submit');
      formButton.textContent = 'Save';
      formButton.classList.add('form-button', 'button-styling');

      form.appendChild(formButton);

      const container = document.querySelector('.container');
      container.appendChild(form);

      const saveTask = (ev) => {
        const newTaskDescription = formInput.value;
        form.reset();
        ev.preventDefault();
        controller.newTaskRequested(newTaskDescription);
      };

      form.addEventListener('submit', (ev) => saveTask(ev));
    }
  }

  renderTasks(taskList, controller) {
    if (document.querySelector('.task-list') != null) {
      taskList.forEach((task) => {
        const newCreatedTask = document.createElement('li');

        if (document.getElementById(task.uuid) === null) {
          newCreatedTask.setAttribute('id', task.uuid);
          newCreatedTask.classList.add('task');
          newCreatedTask.textContent = task.description;

          // add task completed button
          const newCompleteBtn = document.createElement('i');
          newCompleteBtn.classList.add(
            'fa-solid',
            'fa-circle-dot',
            'completed-button',
          );
          newCompleteBtn.setAttribute('id', `button-${task.uuid}`);

          // event listener for task completed button
          const completedButtonPress = (ev) => {
            if (task.isCompleted) {
              newCreatedTask.classList.remove('task-completed');
              newCompleteBtn.classList.remove('fa-circle-check');
              newCompleteBtn.classList.add('fa-circle-dot');
            } else {
              newCreatedTask.classList.add('task-completed');
              newCompleteBtn.classList.remove('fa-circle-dot');
              newCompleteBtn.classList.add('fa-circle-check');
            }

            controller.taskCompletionToggled(task.uuid);
          };

          newCompleteBtn.addEventListener('click', (ev) =>
            completedButtonPress(ev),
          );

          // Adding everything to the document
          const taskContainer = document.createElement('span');
          taskContainer.classList.add('task-container');

          taskContainer.appendChild(newCompleteBtn);
          taskContainer.appendChild(newCreatedTask);

          const createdTaskList = document.querySelector('.task-list');
          createdTaskList.appendChild(taskContainer);
        }
      });
    } else {
      const listForTasks = document.createElement('ul');
      listForTasks.classList.add('task-list');

      const container = document.querySelector('.container');
      container.appendChild(listForTasks);
    }
  }

  renderResetButton(taskList, controller) {
    // add reset button
    if (document.querySelector('.reset-button') === null) {
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

        controller.clearListRequested();
      };

      resetButton.addEventListener('click', (ev) => resetButtonPress(ev));
    }
  }

  renderRemoveCompletedButton(taskList, controller) {
    // add remove completed button
    if (document.querySelector('.remove-completed-button') === null) {
      const removeCompletedButton = document.createElement('button');
      removeCompletedButton.classList.add(
        'remove-completed-button',
        'button-styling',
      );
      removeCompletedButton.textContent = 'remove completed';

      const bottomButtons = document.querySelector('.bottom-button-container');
      bottomButtons.appendChild(removeCompletedButton);

      // event listener for reset button
      const removeCompletedButtonPress = (ev) => {
        console.log(`controller removeCompletedButtonPress`);

        const createdTaskList = document.querySelector('.task-list');

        while (createdTaskList.hasChildNodes()) {
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
    if (document.getElementById('container') === null) {
      const container = document.createElement('span');
      container.classList.add('container');
      container.setAttribute('id', 'container');
      document.body.appendChild(container);
    }

    this.renderTitle();
    this.renderForm(controller);
    this.renderTasks(taskList, controller);

    if (document.querySelector('.bottom-button-container') === null) {
      const bottomButtons = document.createElement('span');
      bottomButtons.classList.add('bottom-button-container');
      container.appendChild(bottomButtons);
    }

    this.renderResetButton(taskList, controller);
    this.renderRemoveCompletedButton(taskList, controller);
  }
}
