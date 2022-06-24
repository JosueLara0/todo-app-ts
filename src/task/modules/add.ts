// modules
import LocalStorage from "./storage.js";
import List from "./list.js";

//-----------------------------------------------------------------------------------------------

export default class Add {
  title: HTMLInputElement | null;
  description: HTMLInputElement | null;
  save_btn: HTMLElement | null;
  storage: LocalStorage;
  list: List;

  constructor() {
    this.storage = new LocalStorage();
    this.list = new List();

    // Get DOM elements to be used
    this.title = document.querySelector("#title");
    this.description = document.querySelector("#description");
    this.save_btn = document.querySelector("#save");
  }

  //? Save a task in local storage and render the new list
  taskSave() {
    if (this.save_btn) {
      this.save_btn.onclick = (e): false => {
        e.preventDefault();

        let title: string = "";
        let description: string = "";

        // Get last data from localStorage
        let tasksList: TaskTypes[] = this.storage.getData();
        let lastId: number = this.storage.getLastId();

        // Data saved in inputs
        if (this.title && this.description) {
          title = this.title.value;
          description = this.description.value;
        }

        // Validations
        if (title != "" && description != "") {
          // Create object to be saved
          let task: TaskTypes = {
            id: lastId++,
            title,
            description,
          };

          // Add task to array
          tasksList.push(task);

          // Save object in localStorage
          this.storage.save(tasksList);

          // Update list
          this.list.showList(tasksList);
        } else {
          alert("Introduce a title and his description.");
        }

        return false;
      };
    }
  }
}
