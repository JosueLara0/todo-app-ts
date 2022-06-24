// modules
import Add from "./modules/add.js";
import List from "./modules/list.js";
import LocalStorage from "./modules/storage.js";
import Search from "./modules/search.js";

//-----------------------------------------------------------------------------------------------

export default class App {
  add: Add;
  list: List;
  storage: LocalStorage;

  constructor() {
    this.add = new Add();
    this.list = new List();
    this.storage = new LocalStorage();
  }

  load() {
    // add task
    this.add.taskSave();

    // Get tasks saved in local storage
    const tasksList: TaskTypes[] = this.storage.getData();

    // show tasks list
    this.list.showList(tasksList);

    // Search tasks
    Search();
  }
}
