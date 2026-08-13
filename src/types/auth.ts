export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
}

export interface JwtPayload {
    sub: string;
    username: string;
    iat: number;
    exp: number;
}