// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
var fs = require('fs');
var path = require('path');
var uuid = require("uuid");
var dbPath = path.join(__dirname, "../db/db.json");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile(dbPath, "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      return res.json(JSON.parse(data));
    })
  })

  // app.post("/api/notes", function (req, res) {
  //   console.log(req.body);
  //   notesData.push(req.body);
  //   res.json(notesData);
  // });
  app.post("/api/notes", function(req, res) {
    fs.readFile(dbPath, "utf8", function (err1, data1) {
        if (err1) {
            throw err1;
        }
        // console.log(typeof(data1));
        let arrData = JSON.parse(data1);
        let note = req.body;
        note.id = uuid.v4();
        arrData.push(note);
        fs.writeFile(dbPath, JSON.stringify(arrData, null, 2), function (err2) {
            console.log("Note added");
            if (err2) {
                throw err2;
            }
            return res.json(arrData);
        });
    })

})

//   app.delete("/api/notes/:id", function (req, res) {
//     notesData.pop(req.body);
//     res.json(notesData);


//   });

//   // * DELETE `/api/notes/:id` - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique `id` when it's saved. In order to delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

// };
// delete the note by uuid
app.delete("/api/notes/:id", function(req, res) {
  fs.readFile(dbPath, "utf8", function (err, data2) {
      if (err) throw err;
      let noteObj = JSON.parse(data2)
      let noteObjRemain = noteObj.filter(obj => (obj.id !== req.params.id));
  
      fs.writeFile(dbPath, JSON.stringify(noteObjRemain), function (err, data) {
          if (err) throw err;
          console.log("obj removed");
          return res.json(noteObj);
      })
  })
})
}