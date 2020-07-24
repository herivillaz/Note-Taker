// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var notesData = require("../db/db.json");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  app.post("/api/notes", function(req, res) {
    console.log(req.body);
    notesData.push(req.body);
    res.json(notesData);

    
  });

  app.delete("/api/notes/:id", function(req, res) {
    notesData.pop(req.body);
    res.json(notesData);

    
  });

  // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

};
