const jwt = require('jsonwebtoken');
const RefreshTokens = require("../models/refreshTokens")


const generateAccessToken = (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            email_verified: user.email_verified,
            role: user.role
        }
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '1m' });  
        return accessToken;
    } catch (error) {
        console.error("Fehler beim Generieren des Access Tokens:", error);
        throw new Error("Fehler beim Generieren des Access Tokens");
    }
}

const generateRefreshToken = (user) => {
    try {
        const payload = {
            id: user.id,
            username: user.username,
            password: user.password,
            email: user.email,
            email_verified: user.email_verified,
            role: user.role
        }
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, { expiresIn: '4h' });  
        return refreshToken;
    } catch (error) {
        console.error("Fehler beim Generieren des Refresh Tokens:", error);
        throw new Error("Fehler beim Generieren des Refresh Tokens");
    }
}

const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        console.error("Fehler beim Verifizieren des Tokens:", error);
        throw new Error("Ungültiger oder abgelaufener Token");
    }
}

const refreshAccessToken = async (token) => {
    try {
        const savedTokenInfo = await RefreshTokens.findToken(token);

        console.log(savedTokenInfo)
        
        if (!savedTokenInfo) {
            throw new Error("Invalid refresh token");
        }

        const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);

        const newAccessToken = generateAccessToken(userData);

        return newAccessToken;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    refreshAccessToken
}



