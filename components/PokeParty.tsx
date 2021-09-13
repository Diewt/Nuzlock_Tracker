import { useEffect, useState } from "react";
import MinPokeCard from "@/components/MinPokeCard";

export default function PokeParty({ options, sprites }) {

    let [pokemonPartySprites, setPokemonPartySprites] = useState([]);

    // initial mount of component
    useEffect(() => {
        setPokemonPartySprites([...Array(6)].map((e, i) =>
            <MinPokeCard key={i} cardIndex={i} options={options} sprites={sprites} />
        ));
    }, []);


    return (
        <div className="p-4">
            <input className="w-56 px-4 py-1 text-gray-900 rounded-full
                focus:outline-none focus:ring focus:border-blue-300" placeholder="Nickname Party" />
            <div className="flex flex-row space-x-2 p-2">
                {pokemonPartySprites.map(pokemonSprite => pokemonSprite)}
            </div>
        </div>
    );
}