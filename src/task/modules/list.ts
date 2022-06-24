// modules
import deleteTask from "./delete.js";
import edit from "./edit.js";

//-----------------------------------------------------------------------------------------------

export default class List {
  content: HTMLInputElement | null;

  constructor() {
    // Get DOM elements to be used
    this.content = document.querySelector("#content");
  }

  //? Html template for a new task
  taskTemplate(task: TaskTypes) {
    return `
        <article class="task-item" id="task-${task.id}">
            <h3 class="title">${task.title}</h3>
            <p class="description">${task.description}</p>

            <button class="edit" data-id="${task.id}">Edit</button>
            <button class="delete" data-id="${task.id}">Delete</button>
        </article>`;
  }

  //? Re render the tasks list in the DOM
  showList(tasksList: TaskTypes[]) {
    // Clear movies container in DOM
    if (this.content) this.content.innerHTML = "";

    // show all movies from local storage
    tasksList.forEach((task) => {
      if (this.content) this.content.innerHTML += this.taskTemplate(task);
    });

    // Delete task button
    deleteTask();

    // Edit task button
    edit();
  }
}
