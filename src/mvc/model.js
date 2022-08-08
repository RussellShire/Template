import { v4 as uuidv4 } from 'uuid'

export default class ToDoList {
    constructor () {
        this.taskList = new Map() // Basically a Python dictionary
    }
    hello() {
        return "Hello, I am the model"
    }
    // Public API
    async getAllTasks() {
        // Get all tasks in order of created time
        // Iterate over the values in the Map, put them into a list, order the list by date created, and return
        return this.taskList.entries() // this gets tasks but does not order them
    }
    async addNewTask(description) {
        // create a task, with description, add created time and completed bool
        // Take a description, create a new task, add to Map
        const newTask = this.createNewTask(description); // Creating a new task and assigning to local variable
        
        // QUESTION FOR GRAHAM, the way I've done this the uuid is the key value, does that mean I don't need the uuid in the object itself, or is the duplication useful for when the object is outside the map?
        this.taskList.set(newTask.uuid, newTask); // Setting a map element using uuid from NewTask as key value and whole NewTask object as value
        
        // QUESTION FOR GRAHAM, by adding return I think I've made this function do two things, create map entry and return the same. 
        // I've only done the return for the sake of testing which feels like bad practice?
        return newTask; 
    }
    async markTaskAsCompleted(uuid) {
        // edit task so it is completed
        // Take the uuid of the task from the Map, pull out of map, set is completed as true, put back into the Map
        this.taskList.get(uuid).isCompleted = true
    }
    async removeAllTasks() {
        // clears the list of tasks
        // create a new empty Map 

        //QUESTION FOR GRAHAM: I've done this using the clear method, but I think you wanted me to create a new empty map instead?
        this.taskList.clear();
    }
    // Private API
    createNewTask(description = 'new task'){
        return {
            uuid: uuidv4(), 
            description: description,
            createdTime: new Date(),
            isCompleted: false,
        }
    }
}

export function add(x, y) {
    return x + y
}

export async function getData() {
    return await 1
}