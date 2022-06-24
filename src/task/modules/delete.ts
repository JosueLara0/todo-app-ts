// modules
import LocalStorage from "./storage.js";
import List from "./list.js";

//-----------------------------------------------------------------------------------------------

export default function (): void {
  const storage = new LocalStorage();
  const list = new List();

  // Tasks data available
  let tasks_stored = storage.getData();
  let tasks_viewed = document.querySelectorAll("#content .task-item");

  // Goes through all the delete buttons
  tasks_viewed.forEach((task) => {
    let delete_btn: HTMLElement | null = task.querySelector(".delete");

    // Delete task from storage and DOM on click button
    if (delete_btn) {
      delete_btn.onclick = function (this: any) {
        const task_id: string = this.getAttribute("data-id");

        const new_tasks_stored = tasks_stored.filter(
          (task) => task.id !== parseInt(task_id)
        );

        // Update local storage
        storage.save(new_tasks_stored);

        // Update DOM
        list.showList(new_tasks_stored);
      };
    }
  });
}
