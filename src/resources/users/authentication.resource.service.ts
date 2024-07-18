import {User, AuthUser, UserSessionToken, AccessToken} from "@/resources/users/users.resources";

class AuthService {
    authBaseUrl = "http://localhost:8080/v1/user/auth";
    userBaseUrl = "http://localhost:8080/v1/users";
    static AUTH_PARAM = "_auth";

    async authenticate(authUser: AuthUser): Promise<AccessToken> {
        const response = await fetch(this.authBaseUrl, {
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

    async saveUser(user: User, ): Promise<void>{
        const response = await fetch(this.userBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        console.log(response)

        if (!response.ok) {
            throw new Error("User already exists");
        }

        return await response.json();
    }
}

export const authService = new AuthService();