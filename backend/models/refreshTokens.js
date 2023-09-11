const db = require("../db")
const User = require("./users")


const saveRefreshToken = async (userId, token) => {
    try {

        await User.getUserFromId(userId)

        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 4);  
        const query = `
            INSERT INTO refresh_tokens (user_id, token, expires_at)
            VALUES ($1, $2, $3)
            RETURNING id;
        `;

        const values = [userId, token, expiresAt];

        const result = await db.query(query, values);

        if (result.rows && result.rows.length > 0) {
            console.log('Refresh Token erfolgreich in der Datenbank gespeichert. ID:', result.rows[0].id);
        } else {
            throw new Error('Keine ID zurückgegeben beim Speichern des Refresh Tokens.');
        }

    } catch (error) {
        console.error('Fehler beim Speichern des Refresh Tokens:', error);
        throw new Error('Fehler beim Speichern des Refresh Tokens in der Datenbank.');
    }
}

const deleteRefreshToken = async (refreshToken) => {
    try {
        const query = 'DELETE FROM refresh_tokens WHERE token = $1';
        const result = await db.query(query, [refreshToken]);

        if (result.rowCount === 0) {
            throw new Error("No refresh token found to delete.");
        }
    } catch (error) {
        console.error("Error deleting refresh token:", error);
        throw new Error("Database error while deleting refresh token.");
    }
};

const findToken = async (token) => {
    try {
        const result = await db.query('SELECT * FROM refresh_tokens WHERE token = $1', [token]);
        
        if (result.rows.length === 0) {
            throw new Error("No matching refresh token!")
        }

        return result.rows[0];

    } catch (error) {
        console.error('Error when finding token:', error);
        throw new Error('Database error while searching for refresh token.');
    }
};

module.exports = {
   saveRefreshToken,
   deleteRefreshToken,
   findToken
};
