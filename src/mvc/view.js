export default class View {
    constructor(){
    this.submitButton = document.getElementById('submit');
    this.taskList = document.getElementById('task-list');
    this.submitButton.onclick = e => {
        e.preventDefault()
        console.log('test')}
    }
 

    hello() {
        return "Hello, I am the view"
    }

    taskSubmitted(){
        console.log('clicked') 
        //Has an input box for new tasks, when tasks are added passes the description to the controller.


    }


    render(taskList){
        /*Renders the description of each task on the tasklist alongside a button to mark the task as completed.
        Completed tasks are rendered with a strikethrough.*/
        // use create element li
        taskList.forEach(task => {
            newElement = document.createElement('li');
            const description = taskList.description;
            newElement.appendChild(document.createTextNode(description));

            const classAttribute = document.createAttribute('class');
            classAttribute.value = 'task'
            newElement.setAttributeNode(classAttribute);
            
            document.taskList.appendChild(newElement);

        }
        )

        const newElement = document.createElement('li'); 

        // Render whole taskList dynamically, make each id uuid, add a button for mark completed set any marked as completed as stirkethrough
        //maybe append element that adds a class that does strikethrough 
    
    }
    
    taskCompleted(){
        // If the button that marks tasks as completed is triggered passes that task's uuid to the controller
    // Event listener that passes the uuid to the controller when dynamically created, 
}

    taskListReset(){
        // A reset button that when triggered tells the controller.
    }
}
