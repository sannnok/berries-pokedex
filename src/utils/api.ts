import axios, { AxiosResponse } from "axios";
import { Berry } from "../types/berry";

export const fetchBerries = async (): Promise<Berry[]> => {
    const BASE_URL = "https://pokeapi.co/api/v2";

    try {
        const response = await axios.get<{ results: { name: string; url: string }[] }>(`${BASE_URL}/berry`);

        const berries = await Promise.all(
            response.data.results.map(async (berry): Promise<Berry> => {
                try {
                    const details: AxiosResponse<Berry> = await axios.get<Berry>(berry.url);
                    return details.data;
                } catch (innerError) {
                    console.error(`Failed to fetch berry details for URL: ${berry.url}`, innerError);
                    throw new Error(`Could not fetch details for berry: ${berry.url}`);
                }
            })
        );

        return berries;
    } catch (outerError) {
        console.error("Failed to fetch berries list", outerError);
        throw new Error("Could not fetch berries list. Please try again later.");
    }
};
