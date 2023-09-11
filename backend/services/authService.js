const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
require('dotenv').config();
const User = require('../models/users')
const RefreshTokens = require("../models/refreshTokens")
const tokenService = require("./tokenService")

const register = async (username, email, password) => {
    const SALT_ROUNDS = 10
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    try {
        const user = await User.createUser(username, email, hashedPassword)
        return user
    } catch (err) {
        throw err
    }
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMALI_PORT,
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASSWORD 
    }
});

const sendConfirmationEmail = async (email) => {
    try {

        const user = await User.getUserFromEmail(email)

        if (user && user.email_verified) {
            throw new Error('E-Mail-Adresse wurde bereits bestätigt.');
        }
        
        const token = jwt.sign({email}, process.env.JWT_CONFIRMATION_EMAIL_KEY, { expiresIn: '1h' });

        const mailOptions = {
            from: `Gopnik <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Bestätigen Sie Ihre E-Mail-Adresse',
            text: `Klicken Sie auf den folgenden Link, um Ihre E-Mail-Adresse zu bestätigen: http://yourwebsite.com/confirmation?token=${token}`
        };

        await transporter.sendMail(mailOptions);
        console.log('Bestätigungs-E-Mail gesendet.');
        return token
    } catch (error) {
        console.error('Fehler beim Senden der Bestätigungs-E-Mail:', error);
        throw new Error('Fehler beim Senden der Bestätigungs-E-Mail.');
    }
}

const confirmEmail = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_CONFIRMATION_EMAIL_KEY);
        

        if (!decoded || !decoded.email) {
            throw new Error("Missing email confirmation token");
        }

        await User.confirmEmail(decoded.email);
    } catch (error) {
        console.error(error)
        if (error.name && error.name === "JsonWebTokenError") {
            throw new Error("Invalid email confirmation token.");
        }
        throw error;
    }
};


const login = async (email, password) => {

    try {
        const user = await User.getUserFromEmail(email)
        
        

        if(!user || !bcrypt.compareSync(password, user.password)){
            throw new Error("Email or password invalid.")
        }

        const accessToken = tokenService.generateAccessToken(user)
        const refreshToken = tokenService.generateRefreshToken(user)

        
        await RefreshTokens.saveRefreshToken(user.id, refreshToken);

       
        
        return {
            user: user,
            accessToken: accessToken,
            refreshToken: refreshToken
        };



        
    } catch (error) {
        throw error
    }

}

const logout = async (refreshToken) => {
    try {
        await RefreshTokens.deleteRefreshToken(refreshToken);
    } catch (error) {
        throw error
    }
};


module.exports = {
    register,
    sendConfirmationEmail,
    confirmEmail,
    login,
    logout
};
