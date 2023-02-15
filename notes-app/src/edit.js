import { removeNote, updateNote } from "./notes.js";
import { generateLastEdited, initializeEditPage } from "./views.js";

// Gather DOM elements
const titleElement = document.querySelector("#note-title");
const bodyElement = document.querySelector("#note-body");
const removeElement = document.querySelector("#remove-note");
const dateElement = document.querySelector("#last-edited");

// Grab URL parameter of note ID
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

// Update note date and displayed text as user enters data. Save note
titleElement.addEventListener("input", (e) => {
  const note = updateNote(noteId, {
    title: e.target.value,
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

// Update note date and displayed text as user enters data. Save note
bodyElement.addEventListener("input", (e) => {
  const note = updateNote(noteId, {
    body: e.target.value,
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

// Remove note button. Remove note from array, save notes, & send user back to homepage
removeElement.addEventListener("click", (e) => {
  removeNote(noteId);
  location.assign("./index.html");
});

// Listen for local storage changes and re-render note data
// Used to keep current note values updated if note is updated elsewhere
window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    initializeEditPage(noteId);
  }
});
