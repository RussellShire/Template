import { v4 as uuidv4 } from 'uuid'

export default class ToDoList {
    constructor () {
        this.uuidToTask = new Map() // Basically a Python dictionary
    }
    hello() {
        return "Hello, I am the model"
    }
    // Public API
    async getAllTasks() {
        // Get all tasks in order of created time
        // Iterate over the values in the Map, put them into a list, order the list by date created, and return
    }
    async addNewTask(description) {
        // create a task, with description, add created time and completed bool
        // Take a description, create a new task, add to Map
        const newTask = this.createNewTask(description); // Creating a new task and assigning to local variable
        this.uuidToTask.set(newTask.uuid, newTask); // Setting a map element using uuid from NewTask as key value and whole NewTask object as value
        return newTask; // QUESTION FOR GRAHAM, I think I've made this function do two things now for the sake of testing?
    }
    async markTaskAsCompleted() {
        // edit task so it is completed
        // Take the uuid of the task from the Map, pull out of map, set is completed as true, put back into the Map
    }
    async removeAllTasks() {
        // clears the list of tasks
        // create a new empty Map 
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