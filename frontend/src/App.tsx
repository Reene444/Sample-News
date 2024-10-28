// src/App.tsx
import React from 'react';
import NewsList from './pages/components/News/NewsList';
import AppRouter from './router/AppRouter';

const App: React.FC = () => (
    <div>
        <AppRouter />
    </div>
);

export default App;
