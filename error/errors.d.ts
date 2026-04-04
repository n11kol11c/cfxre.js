export type ErrorType = 
    | 'VALIDATION_ERROR' 
    | 'NOT_FOUND_ERROR' 
    | 'UNAUTHORIZED_ERROR' 
    | 'FORBIDDEN_ERROR' 
    | 'CONFLICT_ERROR' 
    | 'INTERNAL_SERVER_ERROR' 
    | 'DATABASE_ERROR';

export interface ErrorPayload {
    status: string;
    type: ErrorType;
    message: string;
    timestamp: string;
    stack?: string;
    details?: any;
}

export interface IAppError extends Error {
    readonly statusCode: number;
    readonly type: ErrorType;
    readonly isOperational: boolean;
    readonly status: string;
    readonly timestamp: string;
    readonly details?: any;
}
