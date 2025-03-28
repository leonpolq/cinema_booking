export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    name: string;
    password: string;
    role: string;
}

export interface Booking {
    id: number;
    title: string;
    description: string;
    date: string;
    userId: number;
}
