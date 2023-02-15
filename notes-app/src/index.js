import { createNote } from "./notes";
import { setFilters } from "./filters";
import { renderNotes } from "./views";

// Render notes to page for first page load
renderNotes();

// Create new note and send user to edit page of new note
document.querySelector("#create-note").addEventListener("click", (e) => {
  const id = createNote();
  location.assign(`./edit.html#${id}`);
});

// Filter rendered list as user add text to input
document.querySelector("#search-text").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderNotes();
});

// Sort rendered list when user selects sort option
document.querySelector("#filter-by").addEventListener("change", (e) => {
  setFilters({
    sortBy: e.target.value,
  });
  renderNotes();
});

// When local storage is accessed, render the data
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    renderNotes();
  }
});
