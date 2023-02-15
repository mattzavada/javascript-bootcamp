// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { createTodo, loadTodos } from "./todos";
import { setFilters } from "./filters";
import { renderTodos } from "./views";

// Render initial todos
renderTodos();

// Set up search text handler
document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
});

// Set up checkbox handler
document.querySelector("#hide-completed").addEventListener("change", (e) => {
  setFilters({
    hideCompleted: e.target.checked,
  });
});

// Set up form submission handler
document.querySelector("#new-todo").addEventListener("submit", (e) => {
  e.preventDefault();

  let inputText = e.target.elements.text.value.trim();
  createTodo(inputText);
  e.target.elements.text.value = "";
});

// Bonus: Add a watcher for local storage
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadTodos();
    renderTodos();
  }
});
