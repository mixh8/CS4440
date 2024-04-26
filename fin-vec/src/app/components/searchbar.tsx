'use client';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
import { getKSimilar } from '../services/lambdaAPI';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Graph from './graph';


export default function Search({ placeholder }: { placeholder: string }) {
    const [ticker, setTicker] = useState('');
    const [date, setDate] = useState('');
    const [industry, setIndustry] = useState('');
    const [k, setK] = useState('');
    const [searchResults, setSearchResults] = useState<Record<string, any[]>>({});
    const [priceOption, setPriceOption] = useState('');

    const priceOptions = ["Underperforming", "Overperforming"];

    const handleTickerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTicker(e.target.value);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
        console.log(date)
    };

    const handleIndustryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setIndustry(e.target.value);
    };

    const handleKChange = (e: ChangeEvent<HTMLInputElement>) => {
        setK(e.target.value);
    };

    const handlePriceOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPriceOption(e.target.value);
    };

    async function handleSearch() {
        // You can perform further actions here, like sending the data to a server or processing it in some way
        console.log("Ticker: " + ticker);
        console.log("Date: " + date);
        console.log("Industry: " + industry);

        if (ticker === '') {
            return;
        }
        console.log("Searching for " + ticker);
        // sample request
        try {
            const response = await getKSimilar(ticker, Number(k), Math.floor(new Date(date).getTime() / 1000));
            setSearchResults(response.data); // Assuming the response has a 'data' property containing the search results
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    /*
    return (
        <div>
            <div>
                <h2>Query Form</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                    <label htmlFor="ticker">Ticker:</label><br />
                    <input type="text" id="ticker" name="ticker" value={ticker} onChange={handleTickerChange} /><br />

                    <label htmlFor="date">Date:</label><br />
                    <input type="date" id="date" name="date" value={date} onChange={handleDateChange} /><br />

                    <label htmlFor="num vectors">Num Vectors:</label><br />
                    <input type="text" id="num vectors" name="num vectors" value={k} onChange={handleKChange} /><br />

                    <label htmlFor="industry">Industry:</label><br />
                    <input type="text" id="industry" name="industry" value={industry} onChange={handleIndustryChange} /><br />

                    <label htmlFor="priceOption">Price Option:</label><br />
                    <select id="priceOption" name="priceOption" value={priceOption} onChange={handlePriceOptionChange}>
                        <option value="">Select a price option</option>
                        {priceOptions.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select><br />

                    <button type="submit">Run Query</button>
                </form>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-24" id="graph">
                {searchResults && Object.keys(searchResults).length > 0 && <Graph data={searchResults} />}
            </div>
        </div>
    );
    */
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Query Form</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="space-y-4">
                    <div>
                        <label htmlFor="ticker" className="block text-sm font-medium text-gray-700">Ticker:</label>
                        <input type="text" id="ticker" name="ticker" value={ticker} onChange={handleTickerChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                        <input type="date" id="date" name="date" value={date} onChange={handleDateChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="num-vectors" className="block text-sm font-medium text-gray-700">Num Vectors:</label>
                        <input type="text" id="num-vectors" name="num-vectors" value={k} onChange={handleKChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="priceOption" className="block text-sm font-medium text-gray-700">Price Option:</label>
                        <select id="priceOption" name="priceOption" value={priceOption} onChange={handlePriceOptionChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Select a price option</option>
                            {priceOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Run Query</button>
                </form>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-24" id="graph">
                {searchResults && Object.keys(searchResults).length > 0 && <Graph data={searchResults} />}
            </div>
        </div>
    );
}