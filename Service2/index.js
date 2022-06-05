const express = require('express');
const cors = require('cors');
const rotaBanco = require('./routes/bankRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/banco", rotaBanco);

app.use((req, res) => {
  res.type('application/json');
  res.status(404).send({output: "Error 404 - Resource Not Found"})  
})

app.listen(5000,()=>console.log(`Server2 at http://localhost:5000`));