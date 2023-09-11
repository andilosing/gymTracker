const authService = require("../services/authService")
const tokenService = require("../services/tokenService")

const register = async (req, res) => {
    try {
        const { username, email, password, passwordConfirmation } = req.body;

        if (password !== passwordConfirmation) {
            return res.status(400).send('Password and password confirmation do not match.');
        }

        const user = await authService.register(username, email, password);

        const emailConfirmationLink = await authService.sendConfirmationEmail(user.email)

        res.status(201).json({ user, confirmationLink: emailConfirmationLink, message: 'User created successfully. Confirmation E-Mail sent.' });

        
    } catch (error) {
        if (error.message === 'E-Mail and Userame already exists') {
            res.status(409).send(error.message);
        } else if (error.message === 'E-Mail already exists') {
            res.status(409).send(error.message);
        } else if (error.message === 'Username already exists') {
            res.status(409).send(error.message);
        } else if (error.message === 'Password and password confirmation do not match.') {
            res.status(400).send(error.message);
        } else if (error.message === 'Database error while checking email existence.') {
            res.status(500).send('Database error while checking for email. Please try again later.');
        } else if (error.message === 'Fehler beim Senden der Bestätigungs-E-Mail.') {
            res.status(500).send('Fehler beim Senden der Bestätigungs-E-Mail.');
        } else {
            res.status(500).send('Internal server error. Please try again later.');
        }
    }
};

const resendConfirmationEmail = async (req, res) => {

    try{

    const email = req.body.email

    const emailConfirmationLink = await authService.sendConfirmationEmail(email)

    res.status(201).json({ confirmationLink: emailConfirmationLink, message: 'Confirmation E-Mail resent.' });
    } catch(error) {
        if (error.message === 'Fehler beim Senden der Bestätigungs-E-Mail.') {
            res.status(500).send('Fehler beim Senden der Bestätigungs-E-Mail.');
        } else {
            res.status(500).send('Internal server error. Please try again later.');
        }
    }
}

const confirmEmail = async (req, res) => {
   
    try{

        const { token } = req.params

        const result = await authService.confirmEmail(token)

        res.status(201).json( {message: 'E-Mail confirmed successfully. ' });

    } catch (error){
        if (error.message === "Token does not match an account.") {
            res.status(404).json({ message: 'Token does not match any account.' });
        } else if (error.message === "Invalid email confirmation token.") {
            res.status(400).json({ message: 'Invalid email confirmation token.' });
        } else if (error.message === "Email already verified.") {
            res.status(400).json({ message: 'Email already verified.' });
        } else if (error.message.includes("Error verifying Email.")) {
            res.status(500).json({ message: 'Error verifying email. Please try again later.' });
        } else {
            res.status(500).json({ message: 'Error confirming email.' });
        }
    }

}


const login = async (req, res) => {

    try {

        const { email, password } = req.body

        const result = await authService.login(email, password)

        const user = result.user
        const accessToken = result.accessToken
        const refreshToken = result.refreshToken

        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 14400000}); // 4h 

        res.json({ accessToken, user, message: `Welcome ${user.username}` });


        
    } catch (error) {
        if(error.message === "XXx"){
            res.status(400).send("ssf")
        } else if (error.message === "Email or password invalid."){
            res.status(404).send("Email or password invalid!")
        } else {
            res.status(500).send("Error logging in.")
        }
    }

}

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new Error("Refresh token not provided.");
        }

        await authService.logout(refreshToken);

        res.clearCookie('refreshToken');
        res.status(200).send("Successfully logged out.");
    } catch (error) {
        console.error("Error in logout:", error.message);
        res.status(500).send("Error during logout.");
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;  
        if (!token) {
            return res.status(403).send("Refresh Token is required.");
        }

        

        const newAccessToken = await tokenService.refreshAccessToken(token);

        

        res.json({ accessToken: newAccessToken });

    } catch (error) {
        if (error.message === "Invalid refresh token") {
            res.status(403).send("Invalid refresh token.");
        } else {
            res.status(500).send("Error refreshing access token.");
        }
    }
};

module.exports = {
    register,
    resendConfirmationEmail,
    confirmEmail,
    login,
    logout,
    refreshToken
};


