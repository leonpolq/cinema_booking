import React from 'react';

interface Props {
    children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({children}) => {
    return <div className="w-100">{children}</div>;
};
