import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import {UserProvider} from "./contexts/UserContext";
import BookingsPage from "./pages/BookingsPage";
import GuestRoute from "./components/hoc/GuestRoute";

const App: React.FC = () => {
    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <BookingsPage/>
                            </ProtectedRoute>}
                    />
                    <Route
                        path="/login"
                        element={
                            <GuestRoute>
                                <LoginPage/>
                            </GuestRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;