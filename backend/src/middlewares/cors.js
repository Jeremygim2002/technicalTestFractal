import cors from 'cors';

const ACCEPTED_ORIGINS = new Set([
    'http://localhost:5174',
    'http://localhost:5173'
]);

export const corsMiddleware = cors({
    origin(origin, callback) {
        if (!origin || ACCEPTED_ORIGINS.has(origin)) {
            callback(null, true);
        } else {
            callback(new Error('violación de política CORS'), false);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
});
