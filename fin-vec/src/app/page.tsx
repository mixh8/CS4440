import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';

Amplify.configure(amplifyconfig);
import Image from "next/image";
import Search from "./components/searchbar";
import { getKSimilar } from "./services/lambdaAPI";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Search placeholder="Search tickers" />
        </main>
    );
}
