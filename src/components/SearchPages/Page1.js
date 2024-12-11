import React, { useState } from 'react';
import './Page1.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Page1 = () => {
    const [inputText, setInputText] = useState('');
    const [aspectData, setAspectData] = useState(null);
    const [threadURL, setThreadURL] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [scrapedData, setScrapedData] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();

        try {
            const apiUrl = inputText.includes('stackoverflow.com/search') 
                ? 'http://localhost:5003/api/fetch-threads' 
                : 'http://localhost:5003/api/fetch-data';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: inputText }),
            });

            if (response.ok) {
                const result = await response.json();

                if (apiUrl.includes('fetch-threads')) {
                    setScrapedData(result.data); // Set the scraped threads
                    setSearchResult('Thread data fetched successfully.');
                } else {
                    setAspectData(result); // Set the aspect data for sentiment analysis
                    setSearchResult('Data processed successfully.');
                }
            } else {
                throw new Error('Failed to process the input.');
            }
        } catch (error) {
            console.error('Error processing input:', error.message);
            setSearchResult('Failed to process the input.');
        }
    };

   

    // Prepare data for the bar chart
    const prepareChartData = (aspectData) => {
        const labels = Object.keys(aspectData);
        const positiveData = labels.map(label => aspectData[label].positive);
        const negativeData = labels.map(label => aspectData[label].negative);

        const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Positive Sentiment (%)',
                    data: positiveData,
                    backgroundColor: colors.slice(0, positiveData.length),
                },
                {
                    label: 'Negative Sentiment (%)',
                    data: negativeData,
                    backgroundColor: colors.slice(0, negativeData.length),
                },
            ],
        };
    };

    return (
        <div className="page-container">
            <h1>Aspect Analysis through Link</h1>
            <form onSubmit={handleSearch} className="search-form">
                <div className="input-container">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter URL of Question or Thread to Analyze"
                        className="input-box"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-button">Analyze</button>
                </div>
            </form>

           

            {searchResult && <div className="search-result">{searchResult}</div>}

            {scrapedData.length > 0 && (
                <div>
                    <h2>Thread Data</h2>
                    <ul className="thread-list">
                        {scrapedData.map((thread, index) => (
                            <li key={index} className="thread-item">
                                <a href={thread.url} target="_blank" rel="noopener noreferrer">{thread.title}</a>
                                <p>{thread.excerpt}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {aspectData && (
                <div>
                    <h2>Aspect Sentiment Analysis</h2>
                    <div className="chart-container">
                        <Bar data={prepareChartData(aspectData)} />
                    </div>
                    <div className="aspect-summary">
                        {Object.entries(aspectData).map(([aspect, data]) => (
                            <div key={aspect} className="aspect-details">
                                <h3>{aspect}</h3>
                                <p>Positive: {data.positive.toFixed(2)}%</p>
                                <p>Negative: {data.negative.toFixed(2)}%</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page1;

