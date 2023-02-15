import { getFilters } from "./filters";
import { getTodos } from "./todos";
import { removeTodo, toggleTodo } from "./todos";

// renderTodos
// Arguments: none
// Return value: none
// Render application todos based on filters
const renderTodos = () => {
  let todos = getTodos();

  //Destructor returned object
  let { searchText, hideCompleted } = getFilters();

  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;

    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);
  const todosEl = document.querySelector("#todos");

  todosEl.innerHTML = "";
  todosEl.appendChild(generateSummaryDOM(incompleteTodos));

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todosEl.appendChild(generateTodoDOM(todo));
    });
  } else {
    const noTodoMessage = document.createElement("p");
    noTodoMessage.textContent = "No to-dos to show";
    noTodoMessage.classList.add("empty-message");
    todosEl.appendChild(noTodoMessage);
  }
};

// generateTodoDOM
// Arguments: todo
// Return value: the todo element
// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const checkbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup todo checkbox
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  containerEl.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
  });

  // Setup the todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  //Setup Container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup the remove button
  removeButton.textContent = "Remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
  });

  return todoEl;
};

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element
// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement("h2");
  let todoWord = incompleteTodos.length === 1 ? "todo" : "todos";

  summary.textContent = `You have ${incompleteTodos.length} ${todoWord} left`;
  summary.classList.add("list-title");
  return summary;
};

// Make sure to set up the exports
export { renderTodos };
