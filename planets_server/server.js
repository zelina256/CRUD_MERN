// Therritja e paketave/librarive
// Libraria Express
const express = require("express");
// Libraria Mongoose: lidhja me DB
const mongoose = require("mongoose");
// Libraria multer: Imazhe
const multer = require("multer");
// Libraria cors(Cross-Origin Resource Sharing): mundeson shkembimin e info
const cors = require("cors");
// Therritja e Route
const planetRouter = require("./routes/planetRouter");
const userRouter = require("./routes/authRouter");
// Therritja e metodes express
const app = express();
// Therrija e metodes path
const path = require("path");
// Therritet metoda cors =>  Cross-Origin Resource Sharing
// Ne varesi te kredencialeve, percaktimi i url se frontend, dhe ku do te shkembehen info e ruajtura ne cookie (perdorimi tek auth).
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  })
);
// Per kalimin e informacioneve ne json (percaktimi i madhesive te informacioneve,)
app.use(express.json({ limit: "1000mb", extended: true }));

// Images
// Percatimi i folderit se ku do te ruhen imazhet
app.use("/images", express.static(path.join(__dirname, "/images")));
// Krijimi i lidhjes se imazhit me folder-in se ku do te ruhen
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  }),
});
// Metoda e ruajtjes se imazhit ne DB dhe tek folderi
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    // Nese nuk ndodh ruajtja e imazhit
    return res.status(400).json({ error: "No file uploaded" });
  }
  // Nese nuk ndodh ruajtja e imazhit
  res.status(200).json("File has been uploaded");
});
// Lidhja me databazen
// Sintaksa
// Ndryshimi i kredencialeve
mongoose
  .connect(
    "mongodb+srv://username:password@cluster0.fdwsitc.mongodb.net/emriDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Something is wrong", err));

// Therrit router
app.use(planetRouter);
app.use(userRouter);

// Testim server
app.use("/", (req, res) => {
  res.send("Hello Node");
});

// Krijimi i serverit
app.listen(3001, () => {
  console.log("Server Created, nodemon");
});
