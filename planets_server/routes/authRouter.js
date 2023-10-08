// Importimi i framework express
const express = require('express')
const app = express()
// Autentifikimi i userve - JSON Web Token
// Gjeneron nje key per userin i cili logohet, lexohet nga server
// Key ruhet tek browser (cookies, session, localStorage) dhe perdoret per shkembim e info
// Ka nevoje per nje element secret
const jwt = require('jsonwebtoken');
const secret = 'asdfe45we45w345wegw345werjktjwertkjfdgfgfsgf';
// Importimi i librarise cookie-parser per ruajtjen e info ne cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser()); /// cookieParser
// Importimi i modelit
const userModel = require('../models/user')
// Importimi i librarise bcrypt per inkriptimin e password
const bcrypt = require("bcrypt");
// Gjenerimi i 10 karaktereve qe do te perdoren per inkriptimin  e password-it
const salt = bcrypt.genSaltSync(10);

// Sintaksa e pergjithshme
// app.method('path',function)

// register
// Perdoret metoda post
// Sintaksa:
// app.post('path', async(req,res)=>{
//
// })
app.post('/register', async (req, res) => {
    // Merren te dhenat nga frontend
    const userInfo = req.body
    try {
        // Disa validime nga backend
        if (userInfo.username == " " && userInfo.name == "") {
            return (
                res.status(404).send("Field are empty")
            )
        }
        if (userInfo.password < 3) {
            return (
                res.status(404).send("Short password")
            )
        }
        // Kontrolli nese ekziston nje user me kete email
        let foundUser = await userModel.findOne({ email: userInfo.email }).exec()
        // Ne varesi te rezultatit ndodhin veprimet
        // Nese user-i ekziston
        if (foundUser) {
            // Shfaqet mesazhi
            return res.status(400).send("This user exist")
        } else {
            // Shtimi i user te ri
            //    Informacionet e marra nga frontend kalohen te key perkatese te modelit
            let newUser = new userModel({
                name: userInfo.name,
                surname: userInfo.surname,
                username: userInfo.username,
                email: userInfo.email,
                // Behet inkriptimi i password, hashimi
                password: bcrypt.hashSync(userInfo.password, salt),
            })
            // Ruajtja
            await newUser.save()
            // Afishi i mesazhit te suksesit
            return res.status(200).send('User Created ' + newUser)
        }

    } catch (err) {
        // Nese ka gabime nga ana e funksionit
        res.status(500).send('Something is wrong')
    }
})

// login
// Perdoret metoda post
// Sintaksa:
// app.post('path', async(req,res)=>{
//
// })
app.post('/login', async (req, res) => {
    // Marrja e te dhenave nga frontend
    const userData = req.body;
    // Kontrolli nese user-i ekziston
    const findUser = await userModel.findOne({ email: userData.email }).exec();
    try {
        // Nese user-i gjendet
        if (findUser) {
            // Krahasohet password i marre nga frontend me ate te gjetur ne databaze
            const passOk = bcrypt.compareSync(userData.password, findUser.password);
            // Nese password-et jane te njejte
            if (passOk) {
                // Perdoren metodat e librarise jsonwebtoken per te gjeruar nje token (kod) unik
                jwt.sign({ email: findUser.email, id: findUser._id }, secret, {}, (err, token) => {
                    // Nese ka probleme me token shfaqet gabimi
                    if (err) {
                        console.error('Error generating token:', err);
                        res.status(500).send("Something is wrong");
                    } else {
                        // Gjenerohet token
                        // Verifikohet gjenerimi i token
                        console.log('Generated token:', token);
                        // Ruajtja e token ne memorien cookie dhe kalim te userContext
                        // Vetem nese perdoret protokolli http
                        res.cookie('token', token, { httpOnly: true }).json({
                            id: findUser._id,
                            email: findUser.email
                        });
                    }
                });
            } else {
                // Gabimi" nese vendosen kredencialet e gabuara
                res.status(400).send('Invalid credentials');
            }
        } else {
            // Gabimi: nese nuk gjendet user-i
            res.status(404).send('User not found');
        }
    } catch (err) {  // Nese ka gabime nga ana e funksionit
        res.status(500).send("Something is wrong " + err);
    }
});

// Auth user - infot e user-it te loguar
// Perdoret metoda get
// Sintaksa:
// app.post('path/:id', async(req,res)=>{
//
// })
// app.post('path/:slug', async(req,res)=>{
//
// })
// Tek path kemi nevoje per nje info unike; mund te jete id ose slug
// id e marrin nga DB; slug e krijojme si fushe/key tel models
app.get('/user', (req, res) => {
    // Merr vleren e token nga frontend
    const { token } = req.cookies;
    // Kontrollon nese token e therritur eshte i njejte me token e user-it te loguar
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Nese jo shfaqet gabimi
            return res.status(401).send('Unauthorized');
        }
        // Kalimi i infomacionit nese token eshte i sakte
        res.json(info);
    });
});

// Logout
// Perdoret metoda post
// Sintaksa:
// app.post('path', async(req,res)=>{
//
// })
app.post('/logout', (req, res) => {
    // Fshirja e token-it, logout user-i
    res.cookie('token', '', { expires: new Date(0), httpOnly: true }).json('ok');
})

// importimi i funksioneve
module.exports = app