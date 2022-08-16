import { v4 as uuidv4 } from 'uuid';

export default class ToDoList {
  constructor() {
    this.uuidToTask = new Map();
  }

  async getAllTasks() {
    return Array.from(this.uuidToTask.values()).sort(
      (a, b) => a.createdTime > b.createdTime,
    ); 
  }

  async addNewTask(description) {
    const newTask = this.createNewTask(description); 

    this.uuidToTask.set(newTask.uuid, newTask); 

    return newTask;
  }

  async toggleTaskCompleted(uuid) {
    this.uuidToTask.get(uuid).isCompleted === false
      ? (this.uuidToTask.get(uuid).isCompleted = true)
      : (this.uuidToTask.get(uuid).isCompleted = false);
  }

  async removeAllTasks() {
    await this.uuidToTask.clear();
  }

  async removeCompletedTasks() {
    this.uuidToTask.forEach((task) => {
      if (task.isCompleted) {
        this.uuidToTask.delete(task.uuid);
      }
    });
  }

  createNewTask(description) {
    return {
      uuid: uuidv4(),
      description: description,
      createdTime: new Date(),
      isCompleted: false,
    };
  }
}
