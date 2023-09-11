const jwt = require('jsonwebtoken');



const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers[`authorization`]
    const token = authHeader && authHeader.split(` `)[1]

    if(!token) {
        return res.status(401).send("Failed authorization")
    }

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            return res.status(403).send("Invalid access token")
        }


        req.user = user
        next()
    })  

}

module.exports = {
    authenticateJWT
}