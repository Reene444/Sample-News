import React, { useState, useEffect, useMemo } from 'react';
import { useTransition, a } from '@react-spring/web';
import shuffle from "lodash.shuffle";
import useMeasure from 'react-use-measure';
import useMedia from '../../../../../hooks/useMedia';
import { fetchNewsArticles } from '../../../../../services/api/newsApi';
import styles from './NewsHeadline.module.css';
interface Article {
    imageUrl: string;
    title: string;
    source: string;
    publishedAt: string;
    description: string;
    url: string;
}

const NewsHeadline: React.FC = () => {
    const columns = useMedia(['(min-width: 100px)', '(min-width: 100px)', '(min-width: `100px)'], [4, 3, 3], 3);
    const [ref, { width }] = useMeasure();
    const [articles, setArticles] = useState<Article[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchNews = async () => {
        try {
            const data = await fetchNewsArticles();
            setArticles(data.map((article: any) => ({
                imageUrl: article.urlToImage,
                title: article.title,
                source: article.source.name,
                publishedAt: new Date(article.publishedAt).toLocaleDateString(),
                description: article.description,
                url: article.url,
            })));
        } catch (err) {
            setError('Error fetching news');
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    useEffect(() => {
        const t = setInterval(() => setArticles((articles) => shuffle(articles)), 1000_000_000);
        return () => clearInterval(t);
    }, [articles]);

    const [heights, gridItems] = useMemo(() => {
        let heights = new Array(columns).fill(0);
        let adjustHightFactor = 0.9;
        let adjustWidthFactor = 0.3;
        let gridItems = articles.map((article, i) => {
            const column = heights.indexOf(Math.min(...heights));
            const x = (width / columns) * column * adjustWidthFactor;
            const y =  900 / 2 ;
            return { ...article, x, y , width: (width / columns )* adjustHightFactor, height: 900 / 2 };
        });
        return [heights, gridItems];
    }, [columns, articles, width]);

    const transitions = useTransition(gridItems, {
        key: (item: Article) => item.url,  // Explicitly define the type of item here
        from: ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) => ({ x, y, width, height, opacity: 0 }),
        enter: ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) => ({ x, y, width, height, opacity: 1 }),
        update: ({ x, y, width, height }: { x: number; y: number; width: number; height: number }) => ({ x, y, width, height }),
        leave: { height: 0, opacity: 0 },
        config: { mass: 5, tension: 500, friction: 100 },
        trail: 25,
    });


    return (
        <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) , '--columns': columns } as React.CSSProperties}>
            {error && <p>{error}</p>}
            {transitions((style, article) => {
                if (article.imageUrl === null) {
                return null;
            }
                return(
                <a.div style={style} className={styles.item} key={article.url}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                        <div
                            style={{
                                backgroundImage: `url(${article.imageUrl}?auto=compress&dpr=2&h=500&w=500)`,
                            }}
                            className={styles.image}
                        />
                    </a>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{article.title}</h2>
                        <p className={styles.source}>Source: {article.source}</p>
                        <p className={styles.date}>Published: {article.publishedAt}</p>
                        <p className={styles.description}>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                            Read more
                        </a>
                    </div>
                </a.div>
                )

})}
        </div>
    );
};

export default NewsHeadline;
