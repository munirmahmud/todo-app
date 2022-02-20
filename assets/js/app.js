const todoForm = document.querySelector(".todo_form");
const todoItems = document.querySelector(".todo-items");

const tasks = [];

const handleSubmit = (e) => {
  e.preventDefault();

  const item = {
    id: Date.now(),
    task: e.target.add_todo.value,
    isCompleted: false,
  };

  tasks.push(item);
  //   e.target.add_todo.value = "";
  todoForm.reset();

  displayTasks();
};

const displayTasks = () => {
  const html = tasks
    .map(
      (item) => `<li>
    <label class="todo-left" for="item-0">
      <input type="checkbox" id="item-0" />
      ${item.task}
    </label>

    <div class="todo-right">
      <svg xmlns="http://www.w3.org/2000/svg" class="edit-icon h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>

      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  </li>`
    )
    .join("");

  todoItems.innerHTML = html;
};

// Event listeners
todoForm.addEventListener("submit", handleSubmit);
