const path = require("path");

module.exports = (app) => {
  // GET /notes route to return the notes.html file
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  // GET * route to return the index.html file for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
