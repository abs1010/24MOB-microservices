require("dotenv").config();

const mongoose = require('mongoose');
const urlBanco = process.env.mongoDBUrl

module.exports = mongoose.connect(urlBanco, {useNewUrlParser: true, useUnifiedTopology: true});