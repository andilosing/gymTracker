const db = require("../db")

const getUserFromId = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error checking if id exists:', error);
        throw new Error('Database error while checking id existence.');
    }
};

const getUserFromEmail = async (email) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        
        return result.rows[0];
    } catch (error) {
        console.error('Error checking if email exists:', error);
        throw new Error('Database error while checking email existence.');
    }
};

const getUserFromUsername = async (username) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    } catch (error) {
        console.error('Error checking if username exists:', error);
        throw new Error('Database error while checking username existence.');
    }
};


const createUser = async (username, email, password) => {
    try {
        const emailExists = await getUserFromEmail(email);
        const usernameExists = await getUserFromUsername(username);
        
        if (emailExists && usernameExists){
            throw new Error("E-Mail and Userame already exists")
        }
        else if (emailExists) {
            throw new Error('E-Mail already exists');
        }
        else if (usernameExists) {
            throw new Error('Username already exists');
        }

        const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

const confirmEmail = async (email) => {
    try {
        const user = await getUserFromEmail(email);

        console.log(user);

        if (!user || !user.email) {
            throw new Error("Token does not match an account.");
        }

        if(user.email_verified) {
            throw new Error("Email already verified.");
        }

        const result = await db.query("UPDATE USERS SET email_verified = true WHERE email = $1", [email]);

        if (result.rowCount === 0) { 
            throw new Error("Error updating email_verified status for the user.");
        }
    } catch (error) {
        console.error(`Error verifying email for ${email}: `, error);
        
        const specificErrors = [
            "Token does not match an account.",
            "Email already verified.",
            "Error updating email_verified status for the user."
        ];

        if (specificErrors.includes(error.message)) {
            throw error;  
        } else {
            throw new Error("Error verifying Email.");  
        }
    }
};






module.exports = {
    getUserFromEmail,
    getUserFromUsername,
    createUser,
    confirmEmail,
    getUserFromId,
};


