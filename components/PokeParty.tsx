import { useContext, useEffect, useState } from "react";
import MinPokeCard from "@/components/MinPokeCard";
import { PokemonPartyContext } from "@/context/PokemonPartyContext";

export default function PokeParty({ options, sprites }) {

    let [pokemonPartySprites, setPokemonPartySprites] = useState([]);

    const { pokemonParty } = useContext(PokemonPartyContext);

    // when pokemonParty is updated
    useEffect(() => {
        setPokemonPartySprites([...Array(6)].map((e, i) => {

            let backgroundSprite: string;

            // if a pokemon has not been edited yet in the party
            if (Object.keys(pokemonParty[i]).length === 0)
                backgroundSprite = null;
            else if (Object.keys(pokemonParty[i]).length !== 0)
                backgroundSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonParty[i].pokemonInfo.id}.png`;

            return (
                <MinPokeCard
                    key={i}
                    cardIndex={i}
                    options={options}
                    sprites={sprites}
                    backgroundSprite={backgroundSprite} />
            );
        }
        ));
    }, [pokemonParty]);


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