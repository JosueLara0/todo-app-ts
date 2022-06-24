// modules
import LocalStorage from "./storage.js";
import List from "./list.js";
//-----------------------------------------------------------------------------------------------
export default class Add {
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
            this.save_btn.onclick = (e) => {
                e.preventDefault();
                let title = "";
                let description = "";
                // Get last data from localStorage
                let tasksList = this.storage.getData();
                let lastId = this.storage.getLastId();
                // Data saved in inputs
                if (this.title && this.description) {
                    title = this.title.value;
                    description = this.description.value;
                }
                // Validations
                if (title != "" && description != "") {
                    // Create object to be saved
                    let task = {
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
                }
                else {
                    alert("Introduce a title and his description.");
                }
                return false;
            };
        }
    }
}
