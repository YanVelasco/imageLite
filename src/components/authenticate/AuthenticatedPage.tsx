import {authService} from "@/resources/users/authentication.resource.service";
import Login from "@/app/login/page";
import React from "react";

export interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({children}) => {
    if (!authService.isSessionValid()) {
        return <Login/>;
    }

    return (
        <div>
            {children}
        </div>
    )
}