import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";
import * as moment from "moment/moment";

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup the note title text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  //setup the link
  noteEl.setAttribute("href", `./edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  //setup status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector("#notes");
  const filters = getFilters();
  // Call sort notes function
  const notes = sortNotes(filters.sortBy);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

const initializeEditPage = (noteId) => {
  // Gather DOM elements
  const titleElement = document.querySelector("#note-title");
  const bodyElement = document.querySelector("#note-body");
  const dateElement = document.querySelector("#last-edited");

  // Obtain array of notes from local storage
  const notes = getNotes();

  // Find note matching ID parameter
  const note = notes.find((note) => note.id === noteId);

  // If note is not found return user to homepage
  if (!note) {
    location.assign("./index.html");
  }

  // Bind note values to inputs
  titleElement.value = note.title;
  bodyElement.value = note.body;

  // Update last edited text
  dateElement.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;

export { renderNotes, generateLastEdited, generateNoteDOM, initializeEditPage };
