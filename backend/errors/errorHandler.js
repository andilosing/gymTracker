const handleErrors = (error, res) => {
        
    if (error.customError) {
        res.status(error.statusCode).send(error.message);
    } else {
        res.status(500).send('Unknown error.');
    }
};

module.exports = {
    handleErrors
}