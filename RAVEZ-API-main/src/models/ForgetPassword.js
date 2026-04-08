// ForgetPasswordModel.js
import { connection } from '../core/database.js';
import { encryptPassword } from '../utils/hash.js';

class ForgetPasswordModel {
    constructor() {
        
        this.thread_db = connection;
    }
    async findUserByEmail(email) {
        // Query to find a user by email
        const [result, ] = await connection.query('SELECT * FROM account WHERE email = ?', [email]);
        return result;
        
    }

    async changePassword(new_password, email) {
        const [result, ] = await connection.query('UPDATE account SET password = ? WHERE email = ?', [encryptPassword(new_password), email]);
        return result;
    }
}

export default ForgetPasswordModel;
