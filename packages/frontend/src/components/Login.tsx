import React from 'react';
import {useUser} from "../contexts/UserContext";

interface LoginProps {
}

export const Login: React.FC<LoginProps> = () => {
    const {setToken} = useUser();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log('data',data);
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            console.log(data.token);
            setToken(data.token);
        } catch (err) {

        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">
                    Login
                </label>
                <input
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <label htmlFor="email">
                    Password
                </label>
                <input
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <button
                type="submit"
            >
                Sign in
            </button>
        </form>

    );
};
