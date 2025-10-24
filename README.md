# Sistema de Gestión de Productos y Órdenes

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
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env.example en /backend)  
```env
PORT=5000
DATABASE_URL=postgresql://postgres:password@localhost:5432/products_orders_db
```

> **Importante**: Crea estos archivos `.env` antes de ejecutar la aplicación

## 5. Estructura del proyecto
```
techinalTestFractal/
├── frontend/               # Aplicación React
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

## 6. Funcionalidades principales

### Productos
- Crear, editar y eliminar productos
- Validación de precios y nombres
- Listado con búsqueda y filtros

### Órdenes
- Crear órdenes con múltiples productos
- Editar cantidades y productos de órdenes existentes
- Calcular automáticamente totales y precios finales
- Gestión de estados de órdenes
- Restricciones para órdenes completadas


## 7. Opcional - SQL genérico
-- Schema para PostgreSQL/MySQL compatible

```bash
CREATE TABLE Product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    unitPrice DECIMAL(10, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Order" (
    id SERIAL PRIMARY KEY,
    orderNumber VARCHAR(255) NOT NULL UNIQUE,
    totalProducts INTEGER NOT NULL DEFAULT 0,
    finalPrice DECIMAL(10, 2) NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

-- Índices para mejorar performance
CREATE INDEX idx_order_status ON "Order"(status);
CREATE INDEX idx_orderproduct_order ON OrderProduct(orderId);
CREATE INDEX idx_orderproduct_product ON OrderProduct(productId);
```