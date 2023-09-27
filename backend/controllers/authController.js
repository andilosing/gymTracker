const { ConflictError, ValidationError, NotFoundError, InternalServerError, BadRequestError } = require("../errors/customError");
const authService = require("../services/authService")
const tokenService = require("../services/tokenService")
const { handleErrors } = require("../errors/errorHandler")
   

const register = async (req, res) => {
    try {
        const { username, email, password, passwordConfirmation } = req.body;

        if (!username || !email || !password || !passwordConfirmation) {
            throw new BadRequestError("All fields are required.");
        }

        if (password !== passwordConfirmation) {
            throw new BadRequestError("Password and Password confirmation do not match!");
        }

        const user = await authService.register(username, email, password);

        const emailConfirmationLink = await authService.sendConfirmationEmail(user.email)

        res.status(201).json({ user, confirmationLink: emailConfirmationLink, message: 'User created successfully. Confirmation E-Mail sent.' });

        
    } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
       handleErrors(error, res)
    }
};

const resendConfirmationEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            throw new BadRequestError("Email field is required.");
        }

        const emailConfirmationLink = await authService.sendConfirmationEmail(email);

        res.status(201).json({
            confirmationLink: emailConfirmationLink,
            message: 'Confirmation E-Mail resent.'
        });
    } catch (error) {
        handleErrors(error, res);
    }
};

const confirmEmail = async (req, res) => {
    try {
        const { token } = req.params;

        if (!token) {
            throw new BadRequestError("Token is required.");
        }

        await authService.confirmEmail(token);

        res.status(201).json({ message: 'E-Mail confirmed successfully.' });
    } catch (error) {
        handleErrors(error, res);
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new BadRequestError("Both email and password are required.");
        }

        const result = await authService.login(email, password);

        res.cookie('refreshToken', result.refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 14400000 });

       // res.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 14400000 }); // 4h

        res.status(200).json({
            accessToken: result.accessToken,
            user: result.user,
            message: `Welcome ${result.user.username}`
        });
    } catch (error) {
        handleErrors(error, res);
    }
};

const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new BadRequestError("Refresh token not provided.");
        }

        await authService.logout(refreshToken);

        res.clearCookie('refreshToken');
        res.status(200).send("Successfully logged out.");
    } catch (error) {
        handleErrors(error, res);
    }
};

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            throw new BadRequestError("Refresh Token is required.");
        }

        const newAccessToken = await tokenService.refreshAccessToken(token);

        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        handleErrors(error, res);
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


