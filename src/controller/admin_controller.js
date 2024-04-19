const adminService = require('../services/admin_service.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AdminController{
    async login(req, res){
        try {
            const name = String(req.body.name ?? '');
            const password = String(req.body.password ?? '');
            if(name.length === 0 || password.length === 0){
                throw new Error('The username and password must be a non-empty string');
            }

            const loginUser = await adminService.login({ name, password });

            const token = jwt.sign({ userId: loginUser[0].id }, process.env.SECRET, {expiresIn: '1d'});

            res.status(200).json({ "auth":true, "token":token });
        } catch (exception) {
            console.error(exception);
            res.status(400).json({"auth":false, "error":exception});
        }
    }
}

const adminController = new AdminController();

module.exports = adminController;