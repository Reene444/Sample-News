// src/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/home/HomePage";
import ErrorPage from '../pages/error/ErrorPage';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Homepage*/}
                <Route path="/error" element={<ErrorPage />} /> {/* Errorpage*/}
            </Routes>
        </Router>
    );
};

export default AppRouter;
