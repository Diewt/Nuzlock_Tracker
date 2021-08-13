import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from 'react-select';
import pokedex from "@/lib/pokeapi";
import { capitalize } from "@/lib/helper_functions";

export default function PokeCard({ cardIndex, pokemonOptions, pokemonSprites }) {

    // placeholders for later implementation of select functionality
    let [selectedPokemon, setSelectedPokemon] = useState(null);
    let [pokemonInfo, setPokemonInfo] = useState(null);
    let [userPokemonInfo, setUserPokemonInfo] = useState({
        "nickname": "",
        "ability": "",
        "nature": "",
        "item": "",
        "moves": [],
        "stats": {
            hp: 0,
            atk: 0,
            def: 0,
            spa: 0,
            spd: 0,
            spe: 0
        }
    });

    // function for filtering options when searching pokemon
    const loadOptions = async (search, prevOptions) => {

        let filteredOptions;
        if (!search) {
            filteredOptions = pokemonOptions;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = pokemonOptions.filter(({ label }) =>
                label.toLowerCase().includes(searchLower)
            );
        }

        const hasMore = filteredOptions.length > prevOptions.length + 10;
        const slicedOptions = filteredOptions.slice(
            prevOptions.length,
            prevOptions.length + 10
        );

        return {
            options: slicedOptions,
            hasMore
        };
    };

    // styling for the pokemon select options
    const formatOptionLabel = ({ value, label }) => (
        <div className="flex flex-row -my-2.5">
            <img alt={value} src={pokemonSprites[value]} className="w-16 h-16" />
            <p className="mt-4">{label}</p>
        </div>
    );

    const onChange = (option) => {
        setSelectedPokemon(option);
        pokedex.getPokemonByName(option.value).then(function (response) {
            setPokemonInfo(response);
        });
        setUserPokemonInfo({
            "nickname": "",
            "ability": "",
            "nature": "",
            "item": "",
            "moves": [],
            "stats": {
                hp: 0,
                atk: 0,
                def: 0,
                spa: 0,
                spd: 0,
                spe: 0
            }
        });
    }

    // for some reason doesn't work right now (selecting an ability)
    const userOnChange = (option, parameters) => {
        setUserPokemonInfo(prevState => { return { ...prevState, [parameters.name]: option.value } });
    }

    return (
        <div className='p-4'>
            <div className='box-border border-2 border-solid shadow-lg grid grid-cols-12 gap-1.5 row-auto max-w-md dark:bg-gray-600 dark:border-yellow-500 mt-8 p-2 relative rounded'>
                <label className='box-border border-2 border-solid rounded-bl-lg rounded-tr-lg shadow-lg dark:border-yellow-500 absolute -top-7 w-40 h-16 bg-white dark:bg-gray-700 transform skew-y-6 -rotate-6'>
                    <p className='ml-1 transform -skew-y-6 rotate-6'>Nickname:</p>
                    <input type='text' placeholder='' className='w-36 bg-gray-300 dark:bg-gray-500 ml-1 mt-2 pl-1 transform -skew-y-6 rotate-6' />
                </label>
                <div className='col-span-5 row-span-1' />
                <AsyncPaginate
                    id={`pokemon-select-${cardIndex}`}
                    instanceId={`pokemon-select-${cardIndex}`}
                    formatOptionLabel={formatOptionLabel}
                    value={selectedPokemon}
                    loadOptions={loadOptions}
                    onChange={onChange}
                    className="col-span-7 row-span-1"
                />
                <div className='col-span-5 row-span-5'>
                    <p>{selectedPokemon?.label}</p>
                    <img src={selectedPokemon ? `http://play.pokemonshowdown.com/sprites/xyani/${selectedPokemon.value}.gif` : "https://play.pokemonshowdown.com/sprites/bw/0.png"} />
                    <div className="flex flex-row">
                        {pokemonInfo?.types.map(i => <p key={i.type.name} className="m-2">{capitalize(i.type.name)}</p>)}
                    </div>
                </div>
                {selectedPokemon ?
                    <Select
                        id={`ability-select-${cardIndex}`}
                        instanceId={`ability-select-${cardIndex}`}
                        name="ability"
                        value={userPokemonInfo?.ability}
                        onChange={userOnChange}
                        options={pokemonInfo?.abilities.map(i => ({ label: capitalize(i.ability.name), value: i.ability.name }))}
                        placeholder="Ability"
                        className="col-span-7 row-span-1"
                    /> :
                    <div className='col-span-7 row-span-1 box-border border-2 p-1 rounded-lg'>
                        Ability
                    </div>
                }
                <div className='col-span-7 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Nature
                </div>
                <div className='col-span-7 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Item
                </div>
                <div className='col-span-7 row-span-6 box-border border-2 p-1 rounded-lg'>
                    <div className='grid grid-cols-3 gap-1.5'>
                        <div>
                            Hp
                        </div>
                        <div></div>
                        <div className='justify-self-end'>{pokemonInfo ? pokemonInfo?.stats[0].base_stat : 0}</div>
                        <div>
                            Atk
                        </div>
                        <div></div>
                        <div className='justify-self-end'>{pokemonInfo ? pokemonInfo?.stats[1].base_stat : 0}</div>
                        <div>
                            Def
                        </div>
                        <div></div>
                        <div className='justify-self-end'>{pokemonInfo ? pokemonInfo?.stats[2].base_stat : 0}</div>
                        <div>
                            Spa
                        </div>
                        <div></div>
                        <div className='justify-self-end'>{pokemonInfo ? pokemonInfo?.stats[3].base_stat : 0}</div>
                        <div>
                            Spd
                        </div>
                        <div></div>
                        <div className='justify-self-end'>{pokemonInfo ? pokemonInfo?.stats[4].base_stat : 0}</div>
                        <div>
                            Spe
                        </div>
                        <div></div>
                        <div className='justify-self-end'>{pokemonInfo ? pokemonInfo?.stats[5].base_stat : 0}</div>
                    </div>
                </div>
                <div className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Move 1
                </div>
                <div className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Move 2
                </div>
                <div className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Move 3
                </div>
                <div className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Move 4
                </div>
            </div>
        </div>
    );
}


