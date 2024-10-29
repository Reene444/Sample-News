// src/App.tsx
import React from 'react';
import AppRouter from './router/AppRouter';
import MouseTrail from "./components/MouseFollower/MouseFollower";

const App: React.FC = () => (
    <div>
        <MouseTrail />
        <AppRouter />
    </div>
);

export default App;
