const express = require('express');
const router = express.Router();
const gerarToken = require('../middleware/gerarToken');
const verificarToken = require('../middleware/auth');
const Client = require('../data/connection')

router.get('/', (req, res) => {
    ///res.status(200).send({output: "Você está no GET"});
    Client.find((erro, dados) => {
        if (erro) return res.status(500).send({output: `Erro ao processar a consulta -> ${erro}`});
        res.status(200).send({output:dados});
    })

})

router.post('/login', (req, res) => {
    Client.findOne({usuario: req.body.usuario}, (err, dados) => {
        if(err) return res.status(500).send({output: 'Erro ao tentar localizar o usuario'});
        if(!dados) return res.status(404).send({output:'Usuário não localizado'});
        if(dados.senha==req.body.senha) {
            return res.status(404).send({output:'Senha ou usuário inválido'});
        }
        const token = gerarToken(dados._id, dados.usuario, dados.email);
        res.status(200).send({output: 'logado', token: token});
    })
})

router.post('/cadastro', (req, res) => {
    ///res.status(201).send({output: "Você está no POST"});
    const dados = new Client(req.body);
    dados.save().then((info) => {
        res.status(201).send({output: `Cliente cadastrado`, cliente: info})
    })
    .catch((err) => {
        res.status(400).send({output: `Erro ao tentar cadastrar->${err}`})
    })

})

router.put('/atualizar/:id', verificarToken, (req, res) => {
    ///res.status(200).send({output: `Você passou o ${req.params.id} e dados: ${req.body}`});
    Client.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, dados)=>{
        if(err) {
            res.status(400).send({output: `Erro ao atualizar->${err}`});
        } else {
            res.status(200).send({output: dados})
        }
    })

})

router.delete('/apagar/:id', verificarToken, (req, res) => {
    ///res.status(204).send({output: "Apagou"})
    Client.findByIdAndDelete(req.params.id, (err, dados)=>{
        if(err) {
            res.status(400).send({output: `Erro ao apagar->${err}`});
        } else {
            res.status(204).send({output: "Cliente apagado"})
        }
    })

})

module.exports = router;





// const database_url="mongodb://127.0.0.1:27017/database";

// mongoose.connect(process.env.mongoDBUrl, {useNewUrlParser:true,useUnifiedTopology:true});

// app.get("/",(req,res)=>{
//     res.send({output:req.headers})
// });

// app.post("/api/user/add",(req,res)=>{

//     const data = new users(req.body);

//     data.save().then((result)=>{
//         res.status(201).send({output:"New user added",payload:result})
//     }).catch((error)=>console.error({output:`insertion Fail -> ${error}`}))

// });

// app.post("/api/user/login",(req,res)=>{

//     const us = req.body.user;
//     const ps = req.body.password;

//     User.findOne({username:us},(error,result)=>{
//         if(error)return res.status(500).send({output:`Error at find user -> ${error}`});
//         if(!result) return res.status(404).send({output:`User not found`});
        
//         bcrypt.compare(ps,result.password,(error,data)=>{
//             if(!data) return res.status(400).send({output:`Password authentication Fail`});
//             const token = create_token(result._id,result.username);
//             const info = new manageruser({userid:result._id,username:result.username,information:req.headers});
//             info.save();
//             res.status(200).send({output:`Authenticated`,payload:result,token:token,url:"http://127.0.0.1:5533"})
//         });
//     });
// });