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

    this.view.render(taskList, controller);
  }

  async newTaskRequested(description) {
    console.log(`newTaskRequested description: ${description}`)
    // Takes a description input from the view and tells the model to add a new task, tells the view to render the task list
    await this.model.addNewTask(description);
    
    // testing
    console.log(this.model.uuidToTask)
    
    this.renderView();
  }

  async taskMarkedAsCompleted(uuid) {
    // Takes a uuid from the view and tells the model to mark task as completed
    await this.model.taskMarkedAsCompleted(uuid);

    this.renderView();
  }

  async clearListRequested() {
    //Takes a reset input from the view and tells the model to clear the task list. Tells the view to rerender the task list empty.
    await this.model.removeAllTasks();

    this.view.renderView();
  }
}
