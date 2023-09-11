const db = require("../db")
const User = require("./users")
const { InternalServerError, NotFoundError } = require('../errors/customError');



const saveRefreshToken = async (userId, token) => {
    try {
        await User.getUserFromId(userId);

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 4);

        const query = `
            INSERT INTO refresh_tokens (user_id, token, expires_at)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;
        const values = [userId, token, expiresAt];
        const result = await db.query(query, values);

        if (!result.rows || result.rows.length === 0) {
            throw new InternalServerError('Keine ID zurückgegeben beim Speichern des Refresh Tokens.');
        }
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError('Fehler beim Speichern des Refresh Tokens in der Datenbank.');
        }
        throw error;
    }
}

const deleteRefreshToken = async (refreshToken) => {
    try {
        const query = 'DELETE FROM refresh_tokens WHERE token = $1';
        const result = await db.query(query, [refreshToken]);
        if (result.rowCount === 0) {
            throw new NotFoundError("No refresh token found to delete.");
        }
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError("Database error while deleting refresh token.");
        }
        throw error;
    }
};

const findToken = async (token) => {
    try {
        const result = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
        if (result.rows.length === 0) {
            throw new NotFoundError("No matching refresh token!");
        }
        return result.rows[0];
    } catch (error) {
        if (!error.customError) {
            throw new InternalServerError('Database error while searching for refresh token.');
        }
        throw error;
    }
};

module.exports = {
   saveRefreshToken,
   deleteRefreshToken,
   findToken
};
