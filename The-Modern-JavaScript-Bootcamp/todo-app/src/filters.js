import { renderTodos } from "./views";

// Set up filters default object
const filters = {
  searchText: "",
  hideCompleted: false,
};

// getFilters
// Arguments: none
// Return value: filters object
const getFilters = () => {
  return filters;
};

// setFilters
// Arguments: updates object with optional searchText or hideCompleted
// Return value: none
const setFilters = (filter) => {
  if (typeof filter.searchText === "string") {
    filters.searchText = filter.searchText;
  }

  if (typeof filter.hideCompleted === "boolean") {
    filters.hideCompleted = filter.hideCompleted;
  }

  renderTodos();
};

// Make sure to set up the exports
export { getFilters, setFilters };
