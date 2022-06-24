// modules
import LocalStorage from "./storage.js";
import List from "./list.js";

//-----------------------------------------------------------------------------------------------

export default function (): void {
  // Create objects
  const storage = new LocalStorage();
  const list = new List();

  // Get DOM elements
  let content = document.querySelector("#content");
  let search_btn = document.querySelector<HTMLElement>("#search");

  // Assign edit button onclick event
  if (search_btn) {
    search_btn.onclick = (e): false => {
      e.preventDefault();

      // Get text searched
      let taskWanted = (
        document.querySelector("#search_field") as HTMLInputElement
      ).value;

      // Get tasks data updated
      let tasks_stored = storage.getData();

      // Apply filter to find task
      const new_tasks = tasks_stored.filter((task) => {
        return task.title
          .toLocaleLowerCase()
          .includes(taskWanted.toLocaleLowerCase());
      });

      // Render list with coincidences
      if (new_tasks.length <= 0 && content) {
        content.innerHTML = `
          <article class="task-item">
            <h2>No match</h2>
          </article>
        `;
      } else {
        list.showList(new_tasks);
      }

      return false;
    };
  }
}
