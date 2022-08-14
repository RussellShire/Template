### TODO

- [x] Define the concepts (and interactions) of the domain (in the language of the subject matter experts)
- [x] Logically test our definitions by explaining them
- [x] Use our conceptual definitions to create our model of the domain with psudocode
- [x] Implement our model (with unit tests)
- [x] Define our controller with psudocode
- [x] Logically test our defitionions by explaining them
- [ ] Implement our controller
- [x] Define our view with psudocode
- [x] Logically test our definitions by explaining them
- [ ] Implement our view
- [ ] Perform user acceptence testing
- [ ] Perform a retrospective

A todo list is an ordered collection of tasks that need to be completed by a person

Ordered collection is a list
A task is a description of what needs to be achieved, and possibly how to achieve it
It is ordered by when tasks were created, first in first out
Tasks are never kept over a day
Tasks can be completed, recorded by striking a line through them

-Objects
To Do List:
Get all the tasks
Add a new task
Mark a task completed
Remove all tasks

Task:
Has a description
Has a created time
Knows if it's completed, Bool

Controller pseudocode:

Takes a description input from the view and tells the model to add a new task, tells the view to render the task list

Takes a uuid from the view and tells the model to mark that uuid as completed, tells the view to re-render the task list

Takes a reset input from the view and tells the model to clear the task list. Tells the view to rerender the task list empty.

View pseudocode:

Has an input box for new tasks, when tasks are added passes the description to the controller.

Renders the decription of each task on the tasklist alongside a button to mark the task as completed.
Completed tasks are rendered with a strikethrough.

If the button that marks tasks as completed is triggered passes that task's uuid to the controller

Has a reset button that when triggered tells the controller.

Notes:

Open files from windows folder to make previewing easier

render entire site from view, rather than just the uuidToTask, this will allow me to keep view not knowing the controller

Can have helper render functions. Render title, render form, render list

To do:
Fix reset button not working
CSS styling
Make tasks completed button toggle on and off
Add icon to tasks completed button
Add 'remove completed tasks' button
