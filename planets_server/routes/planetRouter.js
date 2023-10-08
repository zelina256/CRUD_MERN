// Importimi i framework express
const express = require("express");
const app = express();
// Importimi i modelit
const planetModel = require("../models/planet");
const user = require("../models/user");
// Sintaksa e pergjithshme
// app.method('path',function)

// Create
// Perdoret metoda post
// Sintaksa:
// app.post('path', async(req,res)=>{
//
// })
app.post("/add_planet", async (req, res) => {
  try {
    const userId = req.body.userId;
    // Merr infot nga frontend dhe krijin nje element te ri tek modeli
    // const newPlanet = new planetModel(req.body);
    const newPlanet = new planetModel({
      ...req.body,
      owner: userId,
    });
    // Ruajtje e te dhenave te elementit te ri
    await newPlanet.save();
    // Mesazhi i suksesit
    res.status(200).send(newPlanet);
  } catch (err) {
    console.error("Error creating planet:", err);
    // Nese ka gabime nga ana e funksionit
    res.status(500).send("Not created" + err);
  }
});

// Read all
// Perdoret metoda get
// Sintaksa:
// app.get('path', async(req,res)=>{
//
// })
app.get("/get_all", async (req, res) => {
  try {
    // Gjej te gjitha elementet e modelit te therritur => {} === te gjithe elementet
    const planets = await planetModel.find({});
    // Kalimi i informacionit ne front end
    res.status(200).send(planets);
  } catch (err) {
    // Nese ka gabime nga ana e funksionit
    res.status(500).send("Date not shown" + err);
  }
});

// Read one
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
app.get("/getPlanet/:id", async (req, res) => {
  try {
    // Marrja e vleres se id-se nga frontend
    const planetId = req.params.id;
    // Gjetja e elementit me id e kerkuar
    const planet = await planetModel.findById({ _id: planetId });
    // Kalimi i infomacionit ne frontend
    res.status(200).send(planet);
  } catch (err) {
    // Nese ka gabime nga ana e funksionit
    res.status(500).send("Info not shown " + err);
  }
});
// Update
//  Perdoret metoda patch:update nje ose disa fusha
// Sintaksa:
// app.patch('path/:id', async(req,res)=>{
//
// })
//  Perdoret metoda put:update te gjitha fushat
// Sintaksa:
// app.put('path/:id', async(req,res)=>{
//
// })
app.patch("/updatePlanet/:id", async (req, res) => {
  try {
    // Marrja e vleres se id-se nga frontend
    const planetId = req.params.id;
    // Marr info te update-uar
    const planetUpdate = req.body;
    // bej update
    // $set - tregon qe do te behet update
    // new:true - duhet te ktheje si pergjigje elementin e update-uar
    const planetUp = await planetModel.findByIdAndUpdate(
      { _id: planetId },
      { $set: planetUpdate },
      { new: true }
    );
    // Kalimi i infomacioneve te update-uara
    res.status(200).send(planetUp);
  } catch (err) {
    // Nese ka gabime nga ana e funksionit
    res.status(500).send("Planet not updated " + err);
  }
});
// Delete
//  Perdoret metoda delete
// Sintaksa:
// app.delete('path/:id', async(req,res)=>{
//
// })
app.delete("/delete/:id", async (req, res) => {
  try {
    // Marrja e vleres se id-se nga frontend
    const planetId = req.params.id;
    // Fshirja e elementit me id e percaktuar
    await planetModel.deleteOne({ _id: planetId });
    // Mesazhi i suksesit
    res.status(200).send("Planet Deleted");
  } catch (err) {
    // Nese ka gabime nga ana e funksionit
    res.status(500).send("Planet not deleted " + err);
  }
});

// importimi i funksioneve
module.exports = app;
