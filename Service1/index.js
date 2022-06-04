const express = require('express');
const cors = require('cors');
//const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
//const users = require('./model/user');
//const token = require('./utils/token');
const rotaClients = require('./routes/clients');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/clientes", rotaClients);

app.use((req, res) => {
  res.type('application/json');
  res.status(404).send({output: "Error 404 - Resource Not Found"})  
})

app.listen(4000,()=>console.log(`Server at http://localhost:4000`));