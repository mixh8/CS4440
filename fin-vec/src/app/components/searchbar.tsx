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
    //const [industry, setIndustry] = useState('');
    const [k, setK] = useState('');
    const [searchResults, setSearchResults] = useState<Record<string, any[]>>({});
    const [priceOption, setPriceOption] = useState('');

    const priceOptions = ["Underperforming", "Overperforming"];
    /*
    const industries = ['Heathcare', 'Retail', 'Healthcare', 'Business', 'Software', 'Semiconductor',
        'Farming', 'Utility', 'Power', 'Insurance', 'Chemical', 'Air', 'Electrical',
        'Drugs', 'R.E.I.T.', 'Building', 'Electronics', 'Steel', 'Food', 'Aerospace',
        'Bank', 'Investments', 'Beverage', 'Information', 'Auto', 'Household', 'Oil',
        'Cable', 'Financial', 'Engineering', 'Telecom', 'Transportation',
        'Homebuilding', 'Machinery', 'Restaurant', 'Entertainment', 'Hotel', 'Apparel',
        'Diversified', 'Rubber', 'Oilfield', 'Recreation', 'Computers', 'Computer',
        'Advertising', 'Trucking', 'Brokerage', 'Furn', 'Construction', 'Tobacco',
        'Shoe', 'Packaging', 'Office', 'Environmental', 'Hospitals', 'Real', 'Telecom',
        'Education', 'Banks', 'Precious', 'Reinsurance', 'Broadcasting', 'Publishing',
        'Metals'];
    */

    const handleTickerChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTicker(e.target.value);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    /*
    const handleIndustryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setIndustry(e.target.value);
    };
    */

    const handleKChange = (e: ChangeEvent<HTMLInputElement>) => {
        setK(e.target.value);
    };

    const handlePriceOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPriceOption(e.target.value);
    };

    async function handleSearch() {
        console.log("Ticker: " + ticker);
        console.log("Date: " + date);
        //console.log("Industry: " + industry);

        if (ticker === '') {
            return;
        }
        console.log("Searching for " + ticker);
        try {
            let dateCopy = new Date(date);
            // get next tuesday of date if date is before 2022
            if (dateCopy.getFullYear() < 2022) {
                dateCopy.setDate(dateCopy.getDate() + (1 + 7 - dateCopy.getDay()) % 7);
            }
            
            const response = await getKSimilar(ticker, Number(k), Math.floor(dateCopy.getTime() / 1000), priceOption);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

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
                        <label htmlFor="num-vectors" className="block text-sm font-medium text-gray-700">Num Similar Stocks:</label>
                        <input type="text" id="num-vectors" name="num-vectors" value={k} onChange={handleKChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>

                    <div>
                        <label htmlFor="priceOption" className="block text-sm font-medium text-gray-700">Performance [Optional]:</label>
                        <select id="priceOption" name="priceOption" value={priceOption} onChange={handlePriceOptionChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Select a price option</option>
                            {priceOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    {/* <div>
                        <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry [Optional]:</label>
                        <select id="industry" name="industry" value={industry} onChange={handleIndustryChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                            <option value="">Select an industry</option>
                            {industries.map((industry, index) => (
                                <option key={index} value={industry}>{industry}</option>
                            ))}
                        </select>
                    </div> */}

                    <button type="submit" className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Run Query</button>
                </form>
            </div>
            <div className="flex min-h-screen flex-col items-center justify-between p-24" id="graph">
                {searchResults && Object.keys(searchResults).length > 0 && <Graph data={searchResults} lineDate={date}/>}
            </div>
        </div>
    );
}