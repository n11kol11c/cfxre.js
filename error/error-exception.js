/**
 * Enum for common Error Types to avoid magic strings
 */
const ErrorType = {
  VALIDATION: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED_ERROR',
  INTERNAL: 'INTERNAL_SERVER_ERROR',
  DATABASE: 'DATABASE_ERROR',
};

/**
 * Complex Error Class
 * Extends the native Error to include metadata for API responses
 */
class AppError extends Error {
    constructor(message, statusCode, type = ErrorType.INTERNAL, isOperational = true) {
        super(message);

        this.statusCode = statusCode;
        this.type = type;
        this.isOperational = isOperational;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.timestamp = new Date().toISOString();

        Error.captureStackTrace(this, this.constructor)
    }
}
/**
 * Global Error Handler Logic
 */
const ErrorHandler = {
  handle: (err, res = null) => {
    const errorResponse = {
      status: err.status || 'error',
      type: err.type || ErrorType.INTERNAL,
      message: err.message || 'An unexpected error occurred',
      timestamp: err.timestamp,
    };

    if (!err.isOperational) {
      console.error(' [CRITICAL BUG]:', err);
    } else {
      console.warn(` [${err.type}]: ${err.message}`);
    }

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = err.stack;
    }

    if (res) {
      return res.status(err.statusCode || 500).json(errorResponse);
    }

    return errorResponse;
  }
};
