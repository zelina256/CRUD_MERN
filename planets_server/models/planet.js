// module.exports = Planet
// importimi i librarise se DB
const mongoose = require("mongoose");
// Krijohet schema; tabela; key e objektit
// Informacionet do te ruhen ne formen e nje objekti
// Key: title, description, image; infot brenda {karakteristikat}
const PlanetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});
// Krijimi i modelit
const Planet = mongoose.model("Planet", PlanetSchema);

module.exports = Planet;
