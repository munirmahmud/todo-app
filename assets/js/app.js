const todoForm = document.querySelector(".todo_form");
const todoItems = document.querySelector(".todo-items");

let tasks = [];

const handleSubmit = (e) => {
  e.preventDefault();

  if (!e.target.add_todo.value) return;

  const existingItemId = parseInt(e.target.hidden_item.value);
  if (e.target.hidden_item.value) {
    // Clicked  item / Object
    const editedItem = tasks.find((item) => item.id === existingItemId);
    // Index of clicked item
    const index = tasks.findIndex((item) => item.id === existingItemId);

    const newTasks = [...tasks.slice(0, index), { ...editedItem, task: e.target.add_todo.value }, ...tasks.slice(index + 1)];

    tasks = newTasks;
    todoForm.reset();
    todoItems.dispatchEvent(new CustomEvent("updateTask"));

    return;
  }

  const item = {
    id: Date.now(),
    task: e.target.add_todo.value,
    isCompleted: false,
  };

  tasks.unshift(item);
  //   e.target.add_todo.value = "";
  todoForm.reset();

  todoItems.dispatchEvent(new CustomEvent("updateTask"));
};

const displayTasks = () => {
  const html = tasks
    .map(
      (item) => `<li>
    <label id="${item.id}" class="todo-left ${item.isCompleted && "completed"}" for="item-${item.id}">
      <input type="checkbox" id="item-${item.id}" ${item.isCompleted && "checked"} value="${item.id}" />
      ${item.task}
    </label>

    <div class="todo-right">
      <button type="button" class="edit" value="${item.id}">
        <svg xmlns="http://www.w3.org/2000/svg" class="edit-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>

      <button type="button" class="delete" value="${item.id}">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </li>`
    )
    .join("");

  todoItems.innerHTML = html;
};

function saveTasksIntoLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasksFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("tasks"));

  if (Array.isArray(savedData) && savedData.length > 0) {
    // tasks = savedData;
    // savedData.forEach((item) => tasks.push(item));
    tasks.push(...savedData);

    todoItems.dispatchEvent(new CustomEvent("updateTask"));
  }
}

function completeTask(id) {
  const clickedItem = tasks.find((item) => item.id === id);
  clickedItem.isCompleted = !clickedItem.isCompleted;
  todoItems.dispatchEvent(new CustomEvent("updateTask"));
}

function deleteTask(id) {
  const deletedItem = tasks.filter((item) => item.id !== id);
  tasks = deletedItem;
  todoItems.dispatchEvent(new CustomEvent("updateTask"));
}

function editTask(id) {
  const existingItem = tasks.find((item) => item.id === id);
  todoForm.querySelector("input").value = existingItem.task;
  todoForm.querySelector("[name='hidden_item']").value = existingItem.id;
}

// Event listeners
todoForm.addEventListener("submit", handleSubmit);
todoItems.addEventListener("updateTask", displayTasks);
todoItems.addEventListener("updateTask", saveTasksIntoLocalStorage);

todoItems.addEventListener("click", (e) => {
  const id = parseInt(e.target.id) || parseInt(e.target.value);
  if (e.target.matches("label.todo-left") || e.target.matches("input")) {
    completeTask(id);
  }

  // Delete a specific item from the array
  if (e.target.closest(".delete")) {
    deleteTask(parseInt(e.target.closest(".delete").value));
  }

  // Edite task
  if (e.target.closest(".edit")) {
    editTask(parseInt(e.target.closest(".edit").value));
  }
});

displayTasksFromLocalStorage();
