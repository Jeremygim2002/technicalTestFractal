export interface ApiResponse<T> {
    data: T;
    success?: boolean;
}

export interface ApiError {
    error: string;
    details?: unknown;
}