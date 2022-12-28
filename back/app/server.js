// Requiring express in our server
const express = require('express');
var cors = require('cors')

const app = express();
const fs = require("fs");
app.use(cors())
const {getPointsByZone} = require("./helpers/helpers");

// Defining get request at '/' route
app.get('/barrios', cors(), function (req, res) {
    let rawdata = fs.readFileSync('./data/Barrios.json');
    let data = JSON.parse(rawdata);
    res.json(data);
});

// Defining get request at '/multiple' route
app.get('/puntos', cors(), function (req, res) {
    let rawdata = fs.readFileSync('./data/Puntos.json');
    let data = JSON.parse(rawdata);
    res.json(data);
});

// Defining get request at '/array' route
app.get('/barrios-puntos', cors(), function (req, res) {
    let rawdata = fs.readFileSync('./data/BarriosPuntos.json');
    let data = JSON.parse(rawdata);
    res.json(data);
});

app.get('/puntos-por-zona', cors(), function (req, res) {
    let rawdata = fs.readFileSync('./data/Puntos.json');
    let parsedData = JSON.parse(rawdata);
    let data = getPointsByZone(parsedData)
    res.json(data);
});

// Setting the server to listen at port 3000
app.listen(3000, function (req, res) {
    console.log("Server is running at port 3000");
});