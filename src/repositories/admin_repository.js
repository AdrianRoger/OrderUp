const database = require('../database/database.js');
const Admin = require('../model/admin_model.js');

class AdminRepository{
    async login({ name, password }) {
        try {
            const results = await database.excuteQuery({
                query: 'SELECT * FROM admin WHERE name = $1',
                args: [name]
            })

            if(results.length === 0){
                throw new Error('Username not found!')
            }

            const storedPassword = results[0].password;
            if(password !== storedPassword){
                throw new Error('Incorrect password!');
            }

            console.log('Successful login!');
            return results;
        } catch (error) {
            console.error('Error during login:', error);
            throw new Error({ codeError: 500, message: 'Internal error in login!' });
        }
    }
}

const adminRepository = new AdminRepository();

module.exports = adminRepository