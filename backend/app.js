const express = require("express")
const app = express()
const PORT = 8080
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRoutes = require("./routes/authRoutes")
const globalExerciseRoutes = require("./routes/globalExerciseRoutes")

const authTokenMiddleware = require("./middlewares/authTokenMiddleware")
const authRoleMiddleware = require("./middlewares/authRoleMiddleware")

const corsOptions = {
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(express.static("public"))

app.use(cookieParser());



app.use('/auth', authRoutes);

app.use("/global-exercise", globalExerciseRoutes)

app.use("/protected", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["adimin", "user"]), (req, res) => {
    res.json({message: "This is a authenticatet path!", 
    user: req.user})
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))