const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const schemaCase = require('./models/case.model');
var fast_csv = require("fast-csv");
const app = express();
var fs = require('fs');

mongoose.connect("mongodb://localhost:27017/cases", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(data => console.log('db connected')).catch(err => console.log('db error', err))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
jsonData = [];
const csvFilePath = './cases/cases.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        jsonData = jsonObj;
    });

app.post("/createCase", (req, res) => {
    var caseData = {
        Id: req.body.Id,
        RawContent: req.body.RawContent,
        CaseNumber: req.body.CaseNumber,
        Age: req.body.Age,
        District: req.body.District,
        DeathCause: req.body.DeathCause

    }
    schemaCase.create(caseData, ((err, result) => {
        if (!err) {
            res.send({
                msg: "success",
                data: result

            })
            return;
        }
        res.send({
            msg: "error",
        })
    }));
})

module.exports = app;