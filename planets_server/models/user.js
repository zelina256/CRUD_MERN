// importimi i librarise se DB
const mongoose = require('mongoose')
// Krijohet schema; tabela; key e objektit
// Informacionet do te ruhen ne formen e nje objekti
// Key: title, description, image; infot brenda {karakteristikat}
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
},
    // Data e krijimit   
    { timestamps: true })
// Krijimi i modelit
const Users = mongoose.model('Users', usersSchema)
// Importimi i modelit
module.exports = Users