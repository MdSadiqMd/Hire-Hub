import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

interface NextAuthProviderProps {
    children: ReactNode;
}

const NextAuthProvider: React.FC<NextAuthProviderProps> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
