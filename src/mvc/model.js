import { v4 as uuidv4 } from 'uuid';

export default class ToDoList {
  constructor() {
    this.uuidToTask = new Map(); // Basically a Python dictionary
  }

  hello() {
    return 'Hello, I am the model';
  }

  // Public API
  async getAllTasks() {
    // Get all tasks in order of created time
    // Iterate over the values in the Map, put them into a list, order the list by date created, and return

    // THIS NEEDS TESTING
    return Array.from(this.uuidToTask.entries()).sort(
      (a, b) => a.createdTime > b.createdTime,
    ); // creates an array from map then sorts by createdTime
  }

  async addNewTask(description) {
    // create a task, with description, add created time and completed bool
    // Take a description, create a new task, add to Map
    const newTask = this.createNewTask(description); // Creating a new task and assigning to local variable

    this.uuidToTask.set(newTask.uuid, newTask); // Setting a map element using uuid from NewTask as key value and whole NewTask object as value

    // I've only done the return for the sake of testing which feels like bad practice?
    return newTask;
  }

  async markTaskAsCompleted(uuid) {
    // edit task so it is completed
    // Take the uuid of the task from the Map, pull out of map, set is completed as true, put back into the Map
    this.uuidToTask.get(uuid).isCompleted = true;
    console.log('model: markTaskAsCompleted');
    console.dir(this);
  }

  async removeAllTasks() {
    // clears the list of tasks
    // create a new empty Map
    console.log('model remove all tasks');
    console.dir(this);
    await this.uuidToTask.clear();
  }

  // Private API
  createNewTask(description) {
    return {
      uuid: uuidv4(),
      description: description,
      createdTime: new Date(),
      isCompleted: false,
    };
  }
}
