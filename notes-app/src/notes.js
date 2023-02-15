import { v4 as uuidv4 } from "uuid";
import * as moment from "moment/moment";

let notes = [];

// Read existing notes from localStorage
const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");

  // Return empty array if JSON data is corrupted
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the notes to localStorage
const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// Remove a note from the list
const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

const createNote = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  // Push new note object to notes array with new id and timestamp
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes();

  //Return id so that user can be redirected to newly created note edit.html page
  return id;
};

// Sort your notes by one of three ways
const sortNotes = (sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
};

const updateNote = (id, updates) => {
  // Find note to update
  const note = notes.find((note) => note.id === id);

  // If not does not exist return nothing
  if (!note) {
    return;
  }

  // Verify that title and body are strings and update value and timestamp
  if (typeof updates.title === "string") {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }

  if (typeof updates.body === "string") {
    note.body = updates.body;
    note.updatedAt = moment().valueOf();
  }

  saveNotes();
  return note;
};

// Expose notes from module
const getNotes = () => notes;

// Load notes from storage for the first time
notes = loadNotes();

export { getNotes, createNote, saveNotes, removeNote, sortNotes, updateNote };
