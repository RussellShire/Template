export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async renderView() {
    const taskList = await this.model.getAllTasks();
    const controller = this; // this = controller, because it's the class we're in

    this.view.render(taskList, controller);
  }

  async newTaskRequested(description) {
    if (description === '') {
      await this.model.addNewTask('Do nothing');
    } else {
      await this.model.addNewTask(description);
    }

    this.renderView();
  }

  async taskCompletionToggled(uuid) {
    await this.model.toggleTaskCompleted(uuid);

    this.renderView();
  }

  async clearListRequested() {
    await this.model.removeAllTasks();

    this.renderView();
  }

  async clearCompletedRequested() {
    await this.model.removeCompletedTasks();

    this.renderView();
  }
}
