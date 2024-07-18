import {User, AuthUser, AccessToken, UserSessionToken} from "@/resources/users/users.resources";
import jwtDecode from "jwt-decode";

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

    initialUserSessionToken(token: AccessToken) {
        if (token.accessToken) {
            const decodedToken: UserSessionToken = jwtDecode(token.accessToken);

            // Convert 'exp' from seconds to milliseconds to create a Date object

            const userSessionToken: UserSessionToken = {
                name: decodedToken.name,
                email: decodedToken.email,
                accessToken: token.accessToken,
                exp: decodedToken.exp
            }
            console.log(userSessionToken);
            this.setUserSessionToken(userSessionToken);
        }
    }

    setUserSessionToken(userSessionToken: UserSessionToken){
        localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
    }
}

export const authService = new AuthService();