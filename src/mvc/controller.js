export default class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view
    }

    hello() {
        return "Hello, I am the controller"
    }

    sayHelloFromEveryone() {
        console.log(this.hello())
        console.log(this.model.hello())
        console.log(this.view.hello())
    }

    newTaskRequest() {
        // Takes a description input from the view and tells the model to add a new task, tells the view to render the task list
    }

    taskMarkedAsCompleted() {
        // Takes a description input from the view and tells the model to add a new task, tells the view to render the task list

    }
    resetTaskListRequest() {
        //Takes a reset input from the view and tells the model to clear the task list. Tells the view to rerender the task list empty.
    }
}
