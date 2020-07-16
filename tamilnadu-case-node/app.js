const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
const ShemaCase = require('./models/case.model');
const app = express();
const csvFilePath = './cases/cases.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        mongoose.connect("mongodb://localhost:27017/cases", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }, (err, client) => {
            if (err) throw err;
            client
                .collection("tamilnaduCase")
                .insertMany(jsonObj, (err, res) => {
                    if (err) throw err;
                    client.close();
                });
        })
    });

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: PUT,GET,POST,DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: false }));
app.post("/createCase", (req, res) => {
    var caseData = {
        Id: req.body.Id,
        RawContent: req.body.RawContent,
        CaseNumber: req.body.CaseNumber,
        Age: req.body.Age,
        Gender: req.body.Gender,
        District: req.body.District,
        DeathCause: req.body.DeathCause
    }
    ShemaCase.create(caseData, ((err, result) => {
        if (!err) {
            return res.send({
                msg: "success",
                data: result
            })
        }
        return res.send({
            msg: "error",
        })
    }));
})

module.exports = app;