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
}
