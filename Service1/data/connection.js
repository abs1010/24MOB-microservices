require("dotenv").config();

const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const urlBanco = process.env.mongoDBUrl //"mongodb+srv://Alan:Sf4Z7fkrmafGDHri@cluster0.2wdvs.mongodb.net/mydatabase?retryWrites=true&w=majority"

mongoose.connect(urlBanco, {useNewUrlParser: true, useUnifiedTopology: true})

const table = new mongoose.Schema({
    nomeUsuario:{type:String,unique:true, require:true},
    email:{type:String},
    senha:{type:String},
    telefone:{type:String},
    dataCadastro:{type:Date, default:Date.now}
});

table.pre("save", function (next) {
    let user = this
    if (!user.isModified('senha')) return next();
    bcrypt.hash(user.senha, 10, (error, hashPass) => {
        if (error) return "Error create user"
        user.senha = hashPass
        return next();
    })
})

// Criar o modelo de dados no mongoDB
const Client = mongoose.model("tb_clients", table)

module.exports = Client;