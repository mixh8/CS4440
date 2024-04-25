'use client';

import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { getKSimilar } from '../services/lambdaAPI';
import { useState } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
    function handleSearch() {
        if (ticker === '') {
            return;
        }
        console.log("Searching for " + ticker);
        // sample request
        getKSimilar(ticker, 5, 1356998400);
    }
    const [ticker, setTicker] = useState('');

    return (
        <div
            className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex relative flex  flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                onChange={(e) => {
                    console.log(e.target.value);
                    setTicker(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}

            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}