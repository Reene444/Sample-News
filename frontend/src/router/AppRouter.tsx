// src/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "../pages/HomePage";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* Homepage*/}
            </Routes>
        </Router>
    );
};

export default AppRouter;
