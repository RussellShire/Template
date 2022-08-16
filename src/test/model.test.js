import Model from '../mvc/model.js';

describe('model', () => {
  it('makes a task', () => {
    const model = new Model();

    const task = model.createNewTask('test1');

    expect(task.description).toBe('test1');
    expect(task.isCompleted).toBe(false);
    expect(task.createdTime).toBeTruthy();
    expect(task.uuid).toBeTruthy();
  });

  it('adds a task', async () => {
    const model = new Model();

    await model.addNewTask('test1');

    expect(model.uuidToTask.size).toBe(1);
  });

  it('marks task as completed', async () => {
    const model = new Model();

    const newTask = await model.addNewTask('completed test');

    await model.toggleTaskCompleted(newTask.uuid);

    expect(model.uuidToTask.get(newTask.uuid).isCompleted).toBe(true);
  });

  it('returns all tasks', async () => {
    const model = new Model();

    await model.addNewTask('test1');
    await model.addNewTask('test2');

    const tasks = await model.getAllTasks();

    expect(tasks.length).toBe(2);
  });

  it('clears the task list', async () => {
    const model = new Model();

    await model.addNewTask('test1');

    await model.removeAllTasks();

    expect(model.uuidToTask.size).toBe(0);
  });

  it('removes tasks marked as completed', async () => {
    const model = new Model();

    const notCompletedTask = await model.addNewTask('test1');
    const completedTask = await model.addNewTask('test2');

    await model.toggleTaskCompleted(completedTask.uuid);

    await model.removeCompletedTasks();

    expect(model.uuidToTask.size).toBe(1);
    expect(model.uuidToTask.get(notCompletedTask.uuid)).toBe(notCompletedTask);
    expect(model.uuidToTask.get(completedTask.uuid)).toBe(undefined);
  });
});
