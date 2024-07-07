import React from "react";

interface TemplateProps {
    children: React.ReactNode;
}

export const Template: React.FC<TemplateProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="container mx-auto flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <header className="bg-indigo-950 text-white py-3">
            <div className="container mx-auto flex items-center justify-between px-4">
                <h1 className="text-3xl font-bold">ImageLite</h1>
            </div>
        </header>
    );
};

const Footer: React.FC = () => {
    return (
        <footer className="bg-indigo-950 text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                YanVelasco © {new Date().getFullYear()} - Todos os direitos reservados.
            </div>
        </footer>
    );
};