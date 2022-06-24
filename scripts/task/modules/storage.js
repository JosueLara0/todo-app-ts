export default class LocalStorage {
    constructor() {
        this.id = 1;
    }
    //? Get tasks saved in local storage
    getData() {
        let tasksStorage = localStorage.getItem("tasks");
        let tasks;
        // If is the first time using the app
        if (!tasksStorage) {
            return [
                {
                    id: 0,
                    title: "TypeScript ToDo App",
                    description: "Josue Lara",
                },
            ];
        }
        tasks = JSON.parse(tasksStorage);
        // If all the tasks were deleted
        if (tasks.length === 0) {
            this.id = 0;
            return [];
        }
        // If there are tasks saved in local storage
        this.id = tasks[tasks.length - 1].id + 1;
        return tasks;
    }
    //? Keeps track of the ids
    getLastId() {
        return this.id;
    }
    //? Add task to local storage
    save(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}
