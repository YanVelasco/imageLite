export class User{
    name?: string;
    email?: string;
    password?: string;
}

export class AuthUser{
    email?: string;
    password?: string;
}

export class AccessToken{
    accessToken?: string;
}

export interface UserSessionToken {
    name: string;
    email: string;
    accessToken: string;
    exp?: number
}