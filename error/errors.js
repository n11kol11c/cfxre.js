/** @typedef {import('./errors.d.ts').ErrorType} ErrorType */
/** @typedef {import('./errors.d.ts').IAppError} IAppError */

/** @type {Readonly<Record<string, ErrorType>>} */
export const ErrorTypes = /** @type {any} */ (Object.freeze({
    VALIDATION: 'VALIDATION_ERROR',
    NOT_FOUND: 'NOT_FOUND_ERROR',
    UNAUTHORIZED: 'UNAUTHORIZED_ERROR',
    FORBIDDEN: 'FORBIDDEN_ERROR',
    CONFLICT: 'CONFLICT_ERROR',
    INTERNAL: 'INTERNAL_SERVER_ERROR',
    DATABASE: 'DATABASE_ERROR'
}));

/**
 * @implements {IAppError}
 */
export class AppError extends Error {
    /**
     * @param {string} message
     * @param {number} statusCode
     * @param {ErrorType} [type]
     * @param {boolean} [isOperational]
     * @param {any} [details]
     */
    constructor(message, statusCode, type = ErrorTypes.INTERNAL, isOperational = true, details = null) {
        super(message);

        this.statusCode = statusCode;
        this.type = type;
        this.isOperational = isOperational;
        this.details = details;

        /** @type {string} */
        this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
        this.timestamp = new Date().toISOString();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    static BadRequest(msg, details = null) {
        return new AppError(msg, 400, ErrorTypes.VALIDATION, true, details);
    }

    static NotFound(msg = 'Not Found') {
        return new AppError(msg, 404, ErrorTypes.NOT_FOUND);
    }
}

/**
 * @type {import('./errors.d.ts').IErrorHandler}
 */
export const ErrorHandler = {
    handle: (err, res = null) => {
        let statusCode = 500;
        
        /** @type {import('./errors.d.ts').ErrorPayload} */
        let payload = {
            status: 'error',
            type: ErrorTypes.INTERNAL,
            message: 'Internal Server Error',
            timestamp: new Date().toISOString()
        };

        if (err instanceof AppError) {
            statusCode = err.statusCode;
            payload = {
                status: err.status,
                type: err.type,
                message: err.message,
                timestamp: err.timestamp,
                ...(err.details && { details: err.details })
            };
        }

        if (process.env.NODE_ENV === 'development' && err instanceof Error) {
            payload.stack = err.stack;
        }

        if (res && typeof res.status === 'function') {
            return res.status(statusCode).json(payload);
        }

        return payload;
    }
};
