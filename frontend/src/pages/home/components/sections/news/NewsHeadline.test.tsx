// src/pages/home/components/sections/news/NewsHeadline.test.tsx

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewsHeadline from './NewsHeadline';
import * as api from '../../../../../services/api/newsApi';
import LoadingSpinner from '../../../../../components/LoadingSpinner/LoadingSpinner';
import ErrorMessage from '../../../../..//components/ErrorMessage/ErrorMessage';

jest.mock('../../../../../services/api/newsApi');

describe('NewsHeadline', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear any previous mocks before each test
    });

    test('renders loading spinner when fetching articles', () => {
        (api.fetchNewsArticles as jest.Mock).mockImplementation(() => new Promise(() => {})); // Mock fetch to not resolve
        render(
            <MemoryRouter>
                <NewsHeadline />
            </MemoryRouter>
        );

        expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Check for loading spinner
    });

    test('renders error message when fetching articles fails', async () => {
        (api.fetchNewsArticles as jest.Mock).mockRejectedValueOnce(new Error('Fetch error')); // Mock fetch to reject
        render(
            <MemoryRouter>
                <NewsHeadline />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/error fetching news/i)).toBeInTheDocument(); // Check for error message
        });
    });

    test('renders articles when fetching is successful', async () => {
        const mockArticles = [
            {
                imageUrl: 'http://example.com/image1.jpg',
                title: 'Article 1',
                source: 'Source 1',
                publishedAt: '2024-11-01',
                description: 'Description for article 1',
                url: 'http://example.com/article1',
            },
            {
                imageUrl: 'http://example.com/image2.jpg',
                title: 'Article 2',
                source: 'Source 2',
                publishedAt: '2024-11-01',
                description: 'Description for article 2',
                url: 'http://example.com/article2',
            },
        ];

        (api.fetchNewsArticles as jest.Mock).mockResolvedValueOnce(mockArticles); // Mock fetch to resolve with articles
        render(
            <MemoryRouter>
                <NewsHeadline />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Article 1')).toBeInTheDocument(); // Check for first article title
            expect(screen.getByText('Article 2')).toBeInTheDocument(); // Check for second article title
        });
    });
});
