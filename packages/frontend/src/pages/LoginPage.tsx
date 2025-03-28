import React from 'react';
import {Layout} from '../components/Layout';
import {Login} from "../components/Login";

interface Props {
}

const LoginPage: React.FC<Props> = () => {
    return (
        <Layout>
            <Login/>
        </Layout>
    );
};

export default LoginPage;
