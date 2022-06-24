// modules
import LocalStorage from "./storage.js";
import List from "./list.js";
//-----------------------------------------------------------------------------------------------
export default function () {
    const storage = new LocalStorage();
    const list = new List();
    // Get tasks saved and rendered
    let tasks_stored = storage.getData();
    let tasks_viewed = document.querySelectorAll("#content .task-item");
    // Browse tasks showed
    tasks_viewed.forEach((task) => {
        // Get edit button
        let edit_btn = task.querySelector(".edit");
        // Assign edit button onclick event
        if (edit_btn) {
            edit_btn.onclick = function () {
                var _a, _b, _c;
                // Get id of task to be removed
                const task_id = parseInt(this.getAttribute("data-id"));
                // Remove buttons
                edit_btn === null || edit_btn === void 0 ? void 0 : edit_btn.remove();
                (_a = task.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.remove();
                // Add edit form
                let task_edit_html = `
          <div class="edit_form">
            <h3 class="title">Edit task</h3>
            <form>
              <input type="text" class="edited_title" value="${(_b = task.querySelector(".title")) === null || _b === void 0 ? void 0 : _b.innerHTML}"  />
              <textarea class="edited_description">${(_c = task.querySelector(".description")) === null || _c === void 0 ? void 0 : _c.innerHTML}</textarea>
              <input type="submit" class="update" value="Actualizar"  />
            </form>
          </div>
        `;
                task.innerHTML += task_edit_html;
                // Select update button
                let update_btn = task.querySelector(".update");
                // Assign update button onclick event
                if (update_btn) {
                    update_btn.onclick = function (e) {
                        e.preventDefault();
                        // Find Index of the task to be updated
                        let index = tasks_stored.findIndex((task) => task.id === task_id);
                        // Save object in the index found
                        tasks_stored[index] = {
                            id: task_id,
                            title: task.querySelector(".edited_title")
                                .value,
                            description: task.querySelector(".edited_description").value,
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
