const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const covidCase = new Schema({
    Id: { type: Number, required: true, max: 2000 },
    RawContent: { type: String, required: true, max : 2000},
    CaseNumber: { type: Number, required: true, max: 2000 },
    Age: { type: Number, required: true, max: 2000 },
    Gender: { type: String, required: true, max: 2000 },
    District: { type: String, required: true, max: 2000 },
    DeathCause: { type: String, required: true, max: 2000 },
});

let ShemaCase = mongoose.model('tamilnaduCase', covidCase, 'tamilnaduCase');
module.exports = ShemaCase;