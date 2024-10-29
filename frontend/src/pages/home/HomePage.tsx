// src/pages/Homepage.tsx
import React from 'react';
import NewsHeadline from "./components/sections/news/NewsHeadline";
import Headline from "./components/headline/Headline";


const Homepage: React.FC = () => {
    return (
        <div>
            <Headline/>
            <NewsHeadline />
        </div>
);
};

export default Homepage;
