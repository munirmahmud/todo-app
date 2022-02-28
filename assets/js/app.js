const todoForm = document.querySelector(".todo_form");
const todoItems = document.querySelector(".todo-items");
const todoFooter = document.querySelector(".todo-footer");
const clearCompleted = document.querySelector(".clear-completed");
const footerMenus = document.querySelectorAll(".footer-menus li");

let tasks = [],
  filteredTasks = [],
  isShowAllTasks = true;

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
  displayFooterIfHaveTasks();
};

const displayTasks = () => {
  let html = "";

  if (isShowAllTasks) {
    html = tasks.map((item) => listItem(item)).join("");
  } else {
    html = filteredTasks.map((item) => listItem(item)).join("");
  }

  todoItems.innerHTML = html;
};

function listItem(item) {
  return `<li>
  <label id="${item.id}" class="todo-left ${item.isCompleted && "completed"}" for="item-${item.id}">
    <input type="checkbox" id="item-${item.id}" ${item.isCompleted && "checked"} value="${item.id}" />
    ${item.task}
  </label>

  <div class="todo-right">
  <button type="button" class="edit" value="${item.id}">
  ${editIcon()}
</button>

<button type="button" class="delete" value="${item.id}">
  ${closeIcon()}
</button>
  </div>
</li>`;
}

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

  displayFooterIfHaveTasks();
}

function displayFooterIfHaveTasks() {
  if (tasks.length === 0) {
    todoFooter.style.display = "none";
  } else {
    todoFooter.style.display = "flex";
  }

  const incompletedTasks = tasks.filter((item) => !item.isCompleted).length;

  countLeftItems(incompletedTasks);
}

function countLeftItems(totalItems = 2) {
  const leftItems = document.querySelector(".left-items");

  const count = totalItems > 1 ? `${totalItems} Items Left` : `${totalItems} Item Left`;
  leftItems.innerHTML = count;
}

function clearCompletedTasks(e) {
  const countCompletedTask = tasks.filter((item) => item.isCompleted);
  if (countCompletedTask.length === 0) return;

  const countInCompletedTask = tasks.filter((item) => !item.isCompleted);

  tasks = countInCompletedTask;
  displayFooterIfHaveTasks();
  todoItems.dispatchEvent(new CustomEvent("updateTask"));
}

function completeTask(id) {
  const clickedItem = tasks.find((item) => item.id === id);
  clickedItem.isCompleted = !clickedItem.isCompleted;
  todoItems.dispatchEvent(new CustomEvent("updateTask"));

  // filter left items
  const incompletedTasks = tasks.filter((item) => !item.isCompleted).length;

  countLeftItems(incompletedTasks);
}

function deleteTask(id) {
  const deletedItem = tasks.filter((item) => item.id !== id);
  tasks = deletedItem;
  todoItems.dispatchEvent(new CustomEvent("updateTask"));
  displayFooterIfHaveTasks();
}

function editTask(id) {
  const existingItem = tasks.find((item) => item.id === id);
  todoForm.querySelector("input").value = existingItem.task;
  todoForm.querySelector("[name='hidden_item']").value = existingItem.id;
}

function filterMenus(e) {
  // remove selected class from all li's
  footerMenus.forEach((menu) => menu.classList.remove("selected"));
  // Add selectd class on clicked li

  const classList = e.target.classList;
  classList.add("selected");

  if (classList.contains("all")) {
    isShowAllTasks = true;

    todoItems.dispatchEvent(new CustomEvent("updateTask"));
  } else if (classList.contains("active")) {
    isShowAllTasks = false;
    const clonedArray = [...tasks];

    const newTasks = clonedArray.filter((task) => !task.isCompleted);
    filteredTasks = newTasks;

    todoItems.dispatchEvent(new CustomEvent("updateTask"));
  } else if (classList.contains("completed")) {
    isShowAllTasks = false;
    const clonedArray = [...tasks];

    const newTasks = clonedArray.filter((task) => task.isCompleted);
    filteredTasks = newTasks;

    todoItems.dispatchEvent(new CustomEvent("updateTask"));
  }
}

// Event listeners
todoForm.addEventListener("submit", handleSubmit);
todoItems.addEventListener("updateTask", displayTasks);
todoItems.addEventListener("updateTask", saveTasksIntoLocalStorage);
clearCompleted.addEventListener("click", clearCompletedTasks);

footerMenus.forEach((menu) => menu.addEventListener("click", filterMenus));

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
