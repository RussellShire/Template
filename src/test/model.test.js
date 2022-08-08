import Model from '../mvc/model.js'
import { add, getData } from '../mvc/model.js'
import { v4 as uuidv4 } from 'uuid'

describe("model", () => {
    const model = new Model()

    it.skip("says hello pass example", () => {
        expect(model.hello()).toBe("Hello, I am the model")
    })

    it.skip("adds two numbers", () => {
        expect(add(2,2)).toBe(4)
    })

    it("gets 1", async () => {
        const data = await getData()
        expect(data).toBe(1)
    })

    it("should make a default task", () => {
        const task = model.createNewTask()
        console.log('make default task', task)
    })

    it("should create uuid when called", () => {
        const uuid = uuidv4()
        expect(uuid).not.toBeUndefined()
        // console.log(uuid)
    })

    it("should increase Map size when adding new task", async () => {
        const description = 'test description'
        const taskCounterBefore = model.taskList.size
        await model.addNewTask(description)
        const taskCounterAfter = model.taskList.size
        
        expect(taskCounterAfter).toEqual(taskCounterBefore+1)
    })

    it("new task description is stored", async () => {
        const description = 'new test description'
        const newTask = await model.addNewTask(description)
        //console.log('Key log', newTask.uuid)  
        //console.log('map log', model.taskList.get(newTask.uuid).description)     
        expect(model.taskList.get(newTask.uuid).description).toBe(description)
    })

    it("should change task completed to true", async () => {
        const newTask = await model.addNewTask('completed test')
        model.markTaskAsCompleted(newTask.uuid);
        expect(model.taskList.get(newTask.uuid).isCompleted).toBe(true); 
    })

    it("should only change the selected task to completed", async () => {
        const testTargetUnchanged = await model.addNewTask('test1')
        const testTargetChanged = await model.addNewTask('test2')

        model.markTaskAsCompleted(testTargetChanged.uuid);
        expect(model.taskList.get(testTargetUnchanged.uuid).isCompleted).toBe(false);
    })

    /* QUESTION FOR GRAHAM, I'm not sure how to test returning a Map without creating a circular test
    it("should return all tasks", async () => {
        const testTargetUnchanged = await model.addNewTask('test1')
        const testTargetChanged = await model.addNewTask('test2')
        console.log('get all print', await model.getAllTasks())
    })*/

    it("should clear the task list", async () => {
        const testTargetUnchanged = await model.addNewTask('test1')
        model.removeAllTasks()
        expect(model.taskList.size).toBe(0)
    })
});
