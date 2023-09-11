const authorizeUserRole = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user; 

       

        if (!user) {
            return res.status(401).send("Unauthorized");
        }

        const userRole = user.role;

        if (allowedRoles.includes(userRole)) {
            next(); 
        } else {
            return res.status(403).send("Access forbidden: You don't have permissions");
        }
    }
}

module.exports = {
    authorizeUserRole
}