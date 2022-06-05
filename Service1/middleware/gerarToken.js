const jwt = require('jsonwebtoken');
const config = require("../config/config");

function gerarToken(id, usuario, email) {
    return jwt.sign(
        {
            id:id,
            user:usuario,
            email:email
        }, config.jwt_key, { 
            expiresIn: config.jwt_expires
        }
    )
}

module.exports = gerarToken;