import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBerries } from "../utils/api";
import FirmnessSlider from "../components/FirmnessSlider";
import BerryCard from "../components/BerryCard";
import SearchBar from "../components/SearchBar";
import { Berry } from "../types/berry";

const Home: React.FC = () => {
    const [firmness, setFirmness] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    const { data: berries = [], error, isLoading } = useQuery<Berry[], Error>({
        queryKey: ["berries"], // Correctly specify the queryKey
        queryFn: fetchBerries, // Provide the function to fetch berries
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const filteredBerries = berries
        .filter((berry) => (firmness ? berry.firmness.name === firmness : true))
        .filter((berry) => berry.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="h-full flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-6">

            <div className="flex flex-col items-center w-full md:w-1/4 pr-6">
                <h2 className="text-lg font-semibold text-gray-800">Pok’e Berries</h2>
                <p className="text-sm text-gray-500 mb-4">How tough are you ?</p>
                <FirmnessSlider berries={berries} setFirmness={setFirmness}/>
            </div>

            <div className="flex-1">
                <div className="mb-4">
                    <SearchBar setSearch={setSearch}/>
                </div>

                <div className="flex flex-col gap-4">
                    {filteredBerries.map((berry) => (
                        <BerryCard key={berry.name} berry={berry}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
