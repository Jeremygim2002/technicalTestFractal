import cors from 'cors';

const ACCEPTED_ORIGINS = new Set([
    // URLs de desarrollo local
    'http://localhost:5174',
    'http://localhost:5173',
    
    // URLs nuevas de Vercel
    'https://prueba-técnica-fractal.vercel.app',
    'https://prueba-técnica-fractal-git-main-jeremygim2002s-projects.vercel.app',
    'https://prueba-técnica-fractal-fae5jdnqe-jeremygim2002s-projects.vercel.app'
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
