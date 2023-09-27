const express = require("express")
const app = express()
const PORT = 8080
const cookieParser = require('cookie-parser');
const cors = require("cors");

const authRoutes = require("./routes/authRoutes")
const globalExerciseRoutes = require("./routes/globalExerciseRoutes")
const customExerciseRoutes = require("./routes/customExerciseRoutes")
const workoutRoutes = require("./routes/workoutsRoutes")
const workoutExerciseRoutes = require("./routes/workoutExerciseRoutes")
const workoutSetRoutes = require("./routes/workoutSetRoutes")

const authTokenMiddleware = require("./middlewares/authTokenMiddleware")
const authRoleMiddleware = require("./middlewares/authRoleMiddleware")

const corsOptions = {
    origin: 'https://reprise.onrender.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};



app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(express.static("public"))

app.use(cookieParser());



app.use('/auth', authRoutes);

app.use("/global-exercise", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["admin", "user"]), globalExerciseRoutes)

app.use("/custom-exercise", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["admin", "user"]), customExerciseRoutes)

app.use("/workouts/:workoutId/exercises/:exerciseId/sets", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["admin", "user"]), workoutSetRoutes)

app.use("/workouts/:workoutId/exercises", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["admin", "user"]), workoutExerciseRoutes)

app.use("/workouts", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["admin", "user"]), workoutRoutes)

app.use("/protected", authTokenMiddleware.authenticateJWT, authRoleMiddleware.authorizeUserRole(["admin", "user"]), (req, res) => {
    res.json({message: "This is a authenticatet path!", 
    user: req.user})
})

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}.`))