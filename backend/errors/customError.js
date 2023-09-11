
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
        this.statusCode = 400; // Bad Request
        this.customError = true
    }
}

class ConflictError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConflictError';
        this.statusCode = 409; // Conflict
        this.customError = true
    }
}

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404; // Not Found
        this.customError = true
    }
}

class InternalServerError extends Error {
    constructor(message = 'Internal server error. Please try again later.') {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500; // Internal Server Error
        this.customError = true
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
        this.customError = true;
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnauthorizedError';
        this.statusCode = 401;
        this.customError = true;
    }
}

module.exports = {
    ValidationError,
    ConflictError,
    NotFoundError,
    InternalServerError,
    BadRequestError,
    UnauthorizedError
};
