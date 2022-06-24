// modules
import LocalStorage from "./storage.js";
import List from "./list.js";

//-----------------------------------------------------------------------------------------------

export default function (): void {
  const storage = new LocalStorage();
  const list = new List();

  // Get tasks saved and rendered
  let tasks_stored = storage.getData();
  let tasks_viewed = document.querySelectorAll("#content .task-item");

  // Browse tasks showed
  tasks_viewed.forEach((task) => {
    // Get edit button
    let edit_btn: HTMLElement | null = task.querySelector(".edit");

    // Assign edit button onclick event
    if (edit_btn) {
      edit_btn.onclick = function (this: any): void {
        // Get id of task to be removed
        const task_id = parseInt(this.getAttribute("data-id"));

        // Remove buttons
        edit_btn?.remove();
        task.querySelector(".delete")?.remove();

        // Add edit form
        let task_edit_html = `
          <div class="edit_form">
            <h3 class="title">Edit task</h3>
            <form>
              <input type="text" class="edited_title" value="${
                task.querySelector(".title")?.innerHTML
              }"  />
              <textarea class="edited_description">${
                task.querySelector(".description")?.innerHTML
              }</textarea>
              <input type="submit" class="update" value="Actualizar"  />
            </form>
          </div>
        `;

        task.innerHTML += task_edit_html;

        // Select update button
        let update_btn: HTMLElement | null = task.querySelector(".update");

        // Assign update button onclick event
        if (update_btn) {
          update_btn.onclick = function (e): false {
            e.preventDefault();

            // Find Index of the task to be updated
            let index: number = tasks_stored.findIndex(
              (task) => task.id === task_id
            );

            // Save object in the index found
            tasks_stored[index] = {
              id: task_id,
              title: (task.querySelector(".edited_title") as HTMLInputElement)
                .value,
              description: (
                task.querySelector(".edited_description") as HTMLInputElement
              ).value,
            };

            // Update local storage
            storage.save(tasks_stored);

            // Update tasks showed in DOM
            list.showList(tasks_stored);

            return false;
          };
        }
      };
    }
  });
}
