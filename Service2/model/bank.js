const mongoose = require('mongoose');

const table = new mongoose.Schema({
    user_id:{type:String, require:true},
    nome_banco:{type:String},
    tipo_conta:{type:String},
    limite_cartao:{type:String},
    dataCadastro:{type:Date, default:Date.now}
});

module.exports = mongoose.model("tb_bankdata", table);