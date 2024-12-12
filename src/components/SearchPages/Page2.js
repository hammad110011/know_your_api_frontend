import React, { useState } from 'react';
import './Page2.css';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Page2 = () => {
    const [inputText, setInputText] = useState('');
    const [aspectData, setAspectData] = useState(null);
    const [searchResult, setSearchResult] = useState(null);

    const handleTextSubmit = async (event) => {
        event.preventDefault();
        if (!inputText || inputText.trim().length === 0) {
            setSearchResult('Text input is empty. Please enter valid text.');
            return;
        }
    
        try {
            const response = await fetch('http://localhost:5003/api/process-text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: inputText }),
            });
    
            if (response.ok) {
                const aspectResults = await response.json();
                setAspectData(aspectResults);
                setSearchResult('Text processed successfully.');
            } else {
                const errorData = await response.json();
                setSearchResult(`Error: ${errorData.error || 'Failed to process text.'}`);
            }
        } catch (error) {
            console.error('Error processing text:', error.message);
            setSearchResult('Failed to process the text. Check server logs.');
        }
    };
    

    

    const prepareChartData = (aspectData) => {
        const labels = Object.keys(aspectData);
        const positiveData = labels.map(label => aspectData[label].positive);
        const negativeData = labels.map(label => aspectData[label].negative);

        return {
            labels: labels,
            datasets: [
                {
                    label: 'Positive Sentiment (%)',
                    data: positiveData,
                    backgroundColor: '#36A2EB',
                },
                {
                    label: 'Negative Sentiment (%)',
                    data: negativeData,
                    backgroundColor: '#FF6384',
                },
            ],
        };
    };

    return (
        <div className="page-container">
            <h1>Aspect Analysis</h1>
            {/* Text Input Form */}
            <form onSubmit={handleTextSubmit} className="text-form">
                <div className="textarea-container">
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter text to analyze"
                        className="textarea-box"
                    />
                </div>
                <div className="button-container">
                    <button type="submit" className="submit-button">Analyze Text</button>
                </div>
            </form>

            

            {searchResult && <div className="search-result">{searchResult}</div>}

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

export default Page2;