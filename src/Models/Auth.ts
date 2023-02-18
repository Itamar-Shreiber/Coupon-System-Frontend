export interface LoginModel {
    clientType: string;
    email: string;
    password: string;
}

export interface Credentials {
    clientType: string;
    email: string;
    password: string;
}

export interface User {
    token: string;
    email: string;
    clientType:string;
}