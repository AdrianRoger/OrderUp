const jwt = require('jsonwebtoken');
require('dotenv').config();

class middlwewares{
    verifyJWT(token){
        jwt.verify(token, process.env.SECRET, (err, decode) => {
            if(err){
                return false;
            }

            return true;
        });
    }
}

module.exports = middlwewares;