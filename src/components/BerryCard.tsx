import React from "react";
import { Berry } from "../types/berry";

interface BerryCardProps {
    berry: Berry;
}

const BerryCard: React.FC<BerryCardProps> = ({ berry }) => {
    return (
        <div className="flex items-center bg-gray-100 p-3 rounded-lg shadow-md">
            {/*<div className="flex justify-between items-center">*/}
            {/*<div>*/}
            {/*<h3 className="text-lg font-bold capitalize">{berry.name}</h3>*/}
            <img
                src="https://logowik.com/content/uploads/images/346_raspberry_pi_logo.jpg"
                alt="Berry Icon"
                className="w-10 h-10 rounded-full"
            />
            {/*</div>*/}
            {/*<div className="space-x-2">*/}
            {/*    {berry.flavors*/}
            {/*        .filter((flavor) => flavor.potency > 0)*/}
            {/*        .map((flavor) => (*/}
            {/*            <span*/}
            {/*                key={flavor.flavor.name}*/}
            {/*                className="px-2 py-1 bg-gray-200 text-sm rounded"*/}
            {/*            >*/}
            {/*                {flavor.flavor.name}*/}
            {/*              </span>*/}
            {/*        ))}*/}
            {/*</div>*/}
            <div className="ml-4">
                <h3 className="text-lg font-medium capitalize">{berry.name}</h3>
                <div className="flex gap-2 mt-2">
                    {berry.flavors
                        .filter((flavor) => flavor.potency > 0)
                        .map((flavor) => (
                        <span
                                    key={flavor.flavor.name}
                                    className="px-2 py-1 text-sm bg-gray-200 text-gray-600 rounded-full shadow-sm"
                                >
                          {flavor.flavor.name}
                        </span>
                    ))}
                </div>
            </div>
            {/*</div>*/}
        </div>
    );
};

export default BerryCard;
