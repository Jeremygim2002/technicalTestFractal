

export const formatPrice = (price: number): string => {
    return `S/. ${price.toFixed(2)}`;
};

export const formatDate = (): string => {
    return new Date().toLocaleDateString('es-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const validatePositiveNumber = (value: string, fieldName: string): number => {
    const num = parseFloat(value);
    if (!num || num <= 0) {
        throw new Error(`${fieldName} debe ser mayor a 0`);
    }
    return num;
};

export const validateRequired = (value: string, fieldName: string): string => {
    if (!value.trim()) {
        throw new Error(`${fieldName} es requerido`);
    }
    return value.trim();
};

export const showConfirm = (message: string): boolean => {
    return confirm(message);
};

export const showAlert = (message: string): void => {
    alert(message);
};

export const getStatusBadgeClass = (status: 'Pending' | 'InProgress' | 'Completed'): string => {
    const variants = {
        Pending: 'bg-yellow-100 text-yellow-800',
        InProgress: 'bg-blue-100 text-blue-800',
        Completed: 'bg-green-100 text-green-800',
    };
    return variants[status];
};