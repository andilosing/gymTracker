const db = require("../db");
const { ValidationError, ConflictError, NotFoundError, InternalServerError } = require('../errors/customError');

const getUserFromId = async (id) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error checking if id exists:', error);
        throw new InternalServerError();
    }
};

const getUserFromEmail = async (email) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error checking if email exists:', error);
        throw new InternalServerError();
    }
};

const getUserFromUsername = async (username) => {
    try {
        const result = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    } catch (error) {
        console.error('Error checking if username exists:', error);
        throw new InternalServerError();
    }
};

const createUser = async (username, email, password) => {
    try {
        const emailExists = await getUserFromEmail(email);
        const usernameExists = await getUserFromUsername(username);
        
        if (emailExists && usernameExists){
            throw new ConflictError("E-Mail and Username already exists");
        }
        else if (emailExists) {
            throw new ConflictError('E-Mail already exists');
        }
        else if (usernameExists) {
            throw new ConflictError('Username already exists');
        }

        const result = await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user:', error);
        if (!(error instanceof ValidationError || error instanceof ConflictError || error instanceof NotFoundError)) {
            throw new InternalServerError();
        }
        throw error;
    }
};

const confirmEmail = async (email) => {
    try {
        const user = await getUserFromEmail(email);

        if (!user || !user.email) {
            throw new NotFoundError("Token does not match an account.");
        }

        if(user.email_verified) {
            throw new ConflictError("Email already verified.");
        }

        const result = await db.query("UPDATE USERS SET email_verified = true WHERE email = $1", [email]);

        if (result.rowCount === 0) { 
            throw new NotFoundError("Error updating email_verified status for the user.");
        }
    } catch (error) {
        console.error(`Error verifying email for ${email}: `, error);
        if (!(error instanceof ValidationError || error instanceof ConflictError || error instanceof NotFoundError)) {
            throw new InternalServerError();
        }
        throw error;
    }
};

module.exports = {
    getUserFromEmail,
    getUserFromUsername,
    createUser,
    confirmEmail,
    getUserFromId,
};
