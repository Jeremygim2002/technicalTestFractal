# Sistema de Gestión de Productos y Órdenes

## 🚀 Demo en Vivo
**[Ver Demo del Proyecto](https://fronted-silk-nu.vercel.app/)**

- **Frontend**: Desplegado en Vercel
- **Backend**: Desplegado en DigitalOcean App Platform
- **Base de datos**: PostgreSQL en Supabase

---

## 1. Descripción
Aplicación full-stack para gestión de productos y órdenes de compra con funcionalidades CRUD completas, validaciones en tiempo real e interfaz moderna.

## 2. Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS v4.1
- ShadCN/UI Components
- Axios
- React Router

### Backend
- Node.js
- Express v5.1
- PostgreSQL
- Prisma ORM v6.18.0
- Zod (validaciones)
- Pino (logging)

### Base de datos
- PostgreSQL (Supabase)

## 3. Instalación y ejecución

### Instalación completa desde cero

#### 1. Prerequisitos
- Node.js v18+ 
- npm 
- Git

#### 2. Clonar e instalar dependencias
```bash
# Clonar el repositorio
git clone https://github.com/Jeremygim2002/technicalTestFractal.git
cd techinalTestFractal

# Instalar dependencias del backend
cd backend
npm install

# Instalar dependencias del frontend
cd ../frontend
npm install

# Volver a la raíz
cd ..
```

## 4. Variables de entorno necesarias

### Frontend (.env.example en /frontend)
```env
VITE_API_URL=http://localhost:8080/api
```

### Backend (.env.example en /backend)  
```env
PORT=8080
DATABASE_URL=postgresql://postgres:password@localhost:5432/products_orders_db
# Para Supabase con pooler (opcional):
# DIRECT_URL=postgresql://postgres:password@localhost:5432/products_orders_db
FRONTEND_URL=http://localhost:5174
NODE_ENV=development
```

> **Importante**: Crea estos archivos `.env` antes de ejecutar la aplicación

#### 3. 🗃️ Configurar base de datos
```bash
# En el directorio /backend
cd backend

# Generar cliente Prisma
npx prisma generate

# Ejecutar migraciones (crea las tablas)
npx prisma migrate dev
```

#### 4. 🚀 Ejecutar la aplicación completa
```bash

#  Desde la raiz ejecutar frontend y backend simultáneamente
npm run dev

# Opciones alternativas:
npm run dev:backend    # Solo backend en puerto 8080
npm run dev:frontend   # Solo frontend en puerto 5174
```

## 5. Estructura del proyecto
```
techinalTestFractal/
├── frontend/               
│   ├── src/
│   │   ├── components/     # Componentes UI reutilizables
│   │   ├── pages/          # Páginas principales
│   │   ├── hooks/          # Custom hooks
│   │   ├── services/       # Servicios API
│   │   ├── types/          # Tipos TypeScript
│   │   └── lib/            # Utilidades y helpers
├── backend/               
│   ├── src/
│   │   ├── controllers/    # Controladores de rutas
│   │   ├── models/         # Modelos de datos (Prisma)
│   │   ├── routes/         # Definición de rutas
│   │   ├── schemas/        # Esquemas de validación (Zod)
│   │   ├── middlewares/    # Middlewares personalizados
│   │   └── utils/          # Utilidades del servidor
│   └── prisma/             # Configuración de base de datos
└── README.md               # Este archivo
```



## 6. 🌐 Deployment
---
### URLs de Producción
- **Frontend**: `https://fronted-silk-nu.vercel.app/`
- **API Backend**: Configurado automáticamente via variables de entorno
- **Conexión**: HTTPS con SSL/TLS habilitado

---

## 8. 📊 Schema de base de datos (SQL genérico)

Si prefieres crear la base de datos manualmente o usar otro ORM, aquí tienes el schema SQL compatible con PostgreSQL/MySQL:

```sql
-- Tabla de productos
CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de órdenes
CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    orderNumber VARCHAR(255) NOT NULL UNIQUE,
    totalProducts INTEGER NOT NULL DEFAULT 0,
    finalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de relación productos-órdenes
CREATE TABLE OrderProduct (
    id SERIAL PRIMARY KEY,
    orderId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES "Order"(id) ON DELETE CASCADE,
    FOREIGN KEY (productId) REFERENCES Product(id) ON DELETE RESTRICT
);

-- Índices para optimizar consultas
CREATE INDEX idx_order_status ON "Order"(status);
CREATE INDEX idx_orderproduct_order ON OrderProduct(orderId);
CREATE INDEX idx_orderproduct_product ON OrderProduct(productId);
```

> **Nota**: Este proyecto usa Prisma ORM, por lo que las migraciones se manejan automáticamente con `npx prisma migrate dev`. El SQL anterior es solo referencia para otros casos de uso.