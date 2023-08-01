const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// the "public" directory
app.use(express.static("public"));

// notes from db.json
function readNotes() {
  const data = fs.readFileSync(path.join(__dirname, "data", "db.json"), "utf8");
  return JSON.parse(data);
}

// notes to db.json
function writeNotes(notes) {
  fs.writeFileSync(
    path.join(__dirname, "data", "db.json"),
    JSON.stringify(notes),
    "utf8"
  );
}

// GET 
app.get("/api/notes", (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

// POST 
app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  const notes = readNotes();
  newNote.id = Date.now().toString(); 
  notes.push(newNote);
  writeNotes(notes);
  res.json(newNote);
});

// HTML 
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
