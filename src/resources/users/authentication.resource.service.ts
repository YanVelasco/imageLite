import { User, AuthUser, AccessToken, UserSessionToken } from "@/resources/users/users.resources";
import jwtDecode from "jwt-decode";

class AuthService {
    authBaseUrl = process.env.NEXT_PUBLIC_API_URL + "/v1/users/auth";
    userBaseUrl = process.env.NEXT_PUBLIC_API_URL + "/v1/users";
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

    async saveUser(user: User): Promise<void> {
        const response = await fetch(this.userBaseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("User already exists");
        }

        return await response.json();
    }

    initialUserSessionToken(token: AccessToken) {
        if (token.accessToken) {
            const decodedToken: UserSessionToken = jwtDecode(token.accessToken);

            const userSessionToken: UserSessionToken = {
                name: decodedToken.name,
                email: decodedToken.email,
                accessToken: token.accessToken,
                exp: decodedToken.exp,
            };
            this.setUserSessionToken(userSessionToken);
        }
    }

    setUserSessionToken(userSessionToken: UserSessionToken) {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(AuthService.AUTH_PARAM, JSON.stringify(userSessionToken));
            } catch (e) {
                console.error(e);
            }
        }
    }

    getUserSessionToken(): UserSessionToken | null {
        if (typeof window !== "undefined") {
            try {
                const userSessionToken = localStorage.getItem(AuthService.AUTH_PARAM);
                if (userSessionToken) {
                    return JSON.parse(userSessionToken);
                }
            } catch (e) {
                console.error(e);
                return null;
            }
        }
        return null;
    }

    isSessionValid(): boolean {
        const userSessionToken = this.getUserSessionToken();
        if (userSessionToken) {
            const now = Date.now();
            const exp = userSessionToken.exp ? userSessionToken.exp * 1000 : 0;
            if (now < exp) {
                return true;
            }
        }
        return false;
    }

    logout() {
        if (typeof window !== "undefined") {
            localStorage.removeItem(AuthService.AUTH_PARAM);
        }
    }
}

export const authService = new AuthService();