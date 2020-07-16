const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const covidCase = new Schema({
    Id: { type: Number, required: true },
    RawContent: { type: String, required: true },
    CaseNumber: { type: Number, required: true },
    Age: { type: Number, required: true },
    District: { type: String, required: true },
    DeathCause: { type: String, required: true },
});

module.exports = mongoose.model('tamilnaduCase', covidCase, 'tamilnaduCase');

