export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  hello() {
    return 'Hello, I am the controller';
  }

  sayHelloFromEveryone() {
    console.log(this.hello());
    console.log(this.model.hello());
    console.log(this.view.hello());
  }

  async renderView() {
    const taskList = await this.model.getAllTasks();
    const controller = this; // this = controller, because it's the class we're in

    console.log('controller renderView taskList');
    console.log(taskList);

    this.view.render(taskList, controller);
  }

  async newTaskRequested(description) {
    console.log('newTaskRequested description');
    console.log(description);

    // Takes a description input from the view and tells the model to add a new task, tells the view to render the task list
    // If description is blank will throw an error

    const errorMessage = document.querySelector('.error-message');

    if (description === '') {
      errorMessage.textContent = 'Tasks must be described';
    } else {
      errorMessage.textContent = null;

      await this.model.addNewTask(description);

      this.renderView();
    }
  }

  async taskMarkedAsCompleted(uuid) {
    // Takes a uuid from the view and tells the model to mark task as completed
    console.log('taskMarkedAsCompleted');
    console.dir(this);

    await this.model.markTaskAsCompleted(uuid);

    this.renderView();
  }

  async clearListRequested() {
    //Takes a reset input from the view and tells the model to clear the task list. Tells the view to rerender the task list empty.
    await this.model.removeAllTasks();

    console.log('controller clearListRequested');

    this.renderView();
  }

  async clearCompletedRequested() {
    //Takes a reset input from the view and tells the model to clear the task list. Tells the view to rerender the task list empty.
    console.log('controller clearCompletedRequested');
    await this.model.removeCompletedTasks();

    this.renderView();
  }
}
