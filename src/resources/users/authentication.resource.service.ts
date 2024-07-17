import {User, AuthUser, UserSessionToken, AccessToken} from "@/resources/users/users.resources";

class AuthService {
    baseUrl = "http://localhost:8080/v1/user/auth";
    static AUTH_PARAM = "_auth";

    async authenticate(authUser: AuthUser): Promise<AccessToken> {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(authUser),
        });

        if (!response.ok) {
            throw new Error("User/Password incorrect");
        }

        return await response.json();
    }
}

export const authService = new AuthService();