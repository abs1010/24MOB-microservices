const express = require('express');
const router = express.Router();
const generateToken = require('../middleware/gerarToken');
const tokenVerification = require('../middleware/auth');
const bcrypt = require("bcrypt");
const Client = require('../data/connection')

router.get('/', tokenVerification, (req, res) => {
    
    Client.find((erro, dados) => {
        if (erro) return res.status(500).send({output: `Erro ao processar a consulta -> ${erro}`});
        res.status(200).send({output:dados});
    })

})

router.post('/login', (req, res) => {
    Client.findOne({nomeUsuario: req.body.nomeUsuario}, (err, dados) => {

        if(err) return res.status(500).send({output: 'Erro ao tentar localizar o usuario'});

        if(!dados) return res.status(404).send({output:'Usuário ou senha inválidos'});

        bcrypt.compare(req.body.senha, dados.senha, (err, data) => {
            if(err) return res.status(500).send({output: 'Erro ao tentar localizar o usuario'});
            if(!data) return res.status(404).send({output:'Usuário ou senha inválidos'});

            const token = generateToken(dados._id, dados.nomeUsuario, dados.email);
            return res.status(200).send({output: 'logado', token: token});
        })

    })
})

router.post('/cadastro', (req, res) => {
    
    const dados = new Client(req.body);
    dados.save().then((info) => {
        res.status(201).send({output: `Cliente cadastrado`, cliente: info})
    })
    .catch((err) => {
        res.status(400).send({output: `Erro ao tentar cadastrar->${err}`})
    })

})

router.put('/atualizar', tokenVerification, (req, res) => {
    
    Client.findByIdAndUpdate(req.content.id, req.body, {new: true}, (err, dados)=>{
        if(err) {
           res.status(400).send({output: `Erro ao atualizar->${err}`});
        } else {
            res.status(200).send({output: dados})
        }
    })

})

module.exports = router;