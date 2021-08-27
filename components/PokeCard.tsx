import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from 'react-select';
import pokedex from "@/lib/pokeapi";
import { formatLabel } from "@/lib/helper_functions";
import { Option, PokeCardProps } from "@/lib/interfaces";

export default function PokeCard({ cardIndex, options, sprites }: PokeCardProps) {

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
        },
        lvl: 0,
    });

    // function for filtering options when searching pokemon
    const loadPokemonOptions = async (search, prevOptions) => {
        let filteredOptions;
        if (!search) {
            filteredOptions = options.pokemonOptions;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.pokemonOptions.filter(({ label }) =>
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

    const loadItemOptions = async (search, prevOptions) => {
        let filteredOptions;
        if (!search) {
            filteredOptions = options.itemOptions;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = options.itemOptions.filter(({ label }) =>
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

    const loadMoveOptions = async (search, prevOptions) => {
        let filteredOptions;
        if (!search) {
            filteredOptions = pokemonInfo.moves;
        } else {
            const searchLower = search.toLowerCase();

            filteredOptions = pokemonInfo.moves.filter(({ label }) =>
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
    const formatPokemonLabel = ({ value, label }) => (
        <div className="flex flex-row -my-2.5">
            <img alt={value} src={sprites.pokemonSprites[value]} className="w-16 h-16" />
            <p className="mt-4">{label}</p>
        </div>
    );

    const formatItemLabel = ({ value, label }) => (
        <div className="flex flex-row content-start transform -translate-y-2">
            <img alt={value} src={sprites.itemSprites[value]} className="w-8 h-8 transform translate-y-3" />
            <p className="mt-4">{label}</p>
        </div>
    );

    // for the selectin of the main pokemon
    const onChange = (option) => {
        setSelectedPokemon(option);
        pokedex.getPokemonByName(option.value).then(function (response) {
            const movesOptions = response.moves.map(({ move }) => { return { label: formatLabel(move.name), value: move.name } as Option });
            setPokemonInfo({ ...response, moves: movesOptions });
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
            },
            lvl: 0
        });
    }

    // for selecting other parameters like "ability" or "nature"
    const userOnChange = (option: Option, parameters) => {
        setUserPokemonInfo(prevState => { return { ...prevState, [parameters.name]: option.value } });
    }

    const moveOnChange = (option: Option, parameters) => {
        const moveIndex = parseInt(parameters.name.split("-")[1]);
        let newMoves = userPokemonInfo.moves;
        newMoves[moveIndex] = option.value;
        setUserPokemonInfo(prevState => { return { ...prevState, moves: [...newMoves] } });
    }

    return (
        <div className='p-4'>
            <div className='box-border border-2 border-solid shadow-lg grid grid-cols-12 gap-1.5 row-auto max-w-xl dark:bg-gray-600 dark:border-yellow-500 mt-8 p-2 relative rounded'>
                <label className='box-border border-2 border-solid rounded-bl-lg rounded-tr-lg shadow-lg dark:border-yellow-500 absolute -top-7 w-40 h-16 bg-white dark:bg-gray-700 transform skew-y-6 -rotate-6'>
                    <p className='ml-1 transform -skew-y-6 rotate-6'>Nickname:</p>
                    <input type='text' placeholder='' className='w-36 bg-gray-300 dark:bg-gray-500 ml-1 mt-2 pl-1 transform -skew-y-6 rotate-6' />
                </label>
                <div className='col-span-5 row-span-1' />

                <AsyncPaginate
                    id={`pokemon-select-${cardIndex}`}
                    instanceId={`pokemon-select-${cardIndex}`}
                    formatOptionLabel={formatPokemonLabel}
                    value={selectedPokemon}
                    loadOptions={loadPokemonOptions}
                    onChange={onChange}
                    className="col-span-7 row-span-1"
                />
                <div className='col-span-5 row-span-5'>
                    <img src={selectedPokemon ? `http://play.pokemonshowdown.com/sprites/xyani/${selectedPokemon.value}.gif` : "https://play.pokemonshowdown.com/sprites/bw/0.png"} />
                </div>
                <div className='col-span-7 row-span-5'>
                    <div className="col-span-7 flex flex-row items-center">
                        {pokemonInfo?.types.map(i => <img key={i.type.name} className="m-2" src={`https://play.pokemonshowdown.com/sprites/types/${formatLabel(i.type.name)}.png`} />)}
                        <div className='box-border border-2 col-span-5 rounded-lg p-1'>
                            Level: {pokemonInfo ? userPokemonInfo?.lvl : 0}
                        </div>
                    </div>
                </div>
                {selectedPokemon ?
                    <Select
                        id={`ability-select-${cardIndex}`}
                        instanceId={`ability-select-${cardIndex}`}
                        name="ability"
                        value={{ label: formatLabel(userPokemonInfo?.ability), value: userPokemonInfo?.ability }}
                        onChange={userOnChange}
                        options={pokemonInfo?.abilities.map(i => ({ label: formatLabel(i.ability.name), value: i.ability.name }))}
                        placeholder="Ability"
                        className="col-span-4 row-span-1"
                    /> :
                    <div className='col-span-4 row-span-1 box-border border-2 p-1 rounded-lg'>
                        Ability
                    </div>
                }
                {selectedPokemon ?
                    <Select
                        id={`nature-select-${cardIndex}`}
                        instanceId={`nature-select-${cardIndex}`}
                        name="nature"
                        value={{ label: formatLabel(userPokemonInfo?.nature), value: userPokemonInfo?.nature }}
                        onChange={userOnChange}
                        options={options.natureOptions}
                        placeholder="Nature"
                        className="col-span-4 row-span-1"
                    /> :
                    <div className='col-span-4 row-span-1 box-border border-2 p-1 rounded-lg'>
                        Nature
                    </div>
                }
                {selectedPokemon ?
                    <AsyncPaginate
                        id={`item-select-${cardIndex}`}
                        instanceId={`item-select-${cardIndex}`}
                        name="item"
                        formatOptionLabel={formatItemLabel}
                        onChange={userOnChange}
                        loadOptions={loadItemOptions}
                        placeholder="Item"
                        className="col-span-4 row-span-1"
                    /> :
                    <div className='col-span-4 row-span-1 box-border border-2 p-1 rounded-lg'>
                        Item
                    </div>
                }
                <div className='col-span-7 row-span-6 box-border border-2 p-1 rounded-lg'>
                    <div className='grid grid-cols-2 gap-y-2'>

                        <label>Hp</label>
                        <input
                            className="w-9 place-self-end text-right"
                            value={pokemonInfo ? pokemonInfo?.stats[0].base_stat : 0}
                            name="hp"
                        />

                        <label>Atk</label>
                        <input
                            className="w-9 place-self-end text-right"
                            value={pokemonInfo ? pokemonInfo?.stats[1].base_stat : 0}
                            name="atk"
                        />

                        <label>Def</label>
                        <input
                            className="w-9 place-self-end text-right"
                            value={pokemonInfo ? pokemonInfo?.stats[2].base_stat : 0}
                            name="def"
                        />

                        <label>Spa</label>
                        <input
                            className="w-9 place-self-end text-right"
                            value={pokemonInfo ? pokemonInfo?.stats[3].base_stat : 0}
                            name="spa"
                        />

                        <label>Spd</label>
                        <input
                            className="w-9 place-self-end text-right"
                            value={pokemonInfo ? pokemonInfo?.stats[4].base_stat : 0}
                            name="spd"
                        />

                        <label>Spe</label>
                        <input
                            className="w-9 place-self-end text-right"
                            value={pokemonInfo ? pokemonInfo?.stats[5].base_stat : 0}
                            name="spe"
                        />

                    </div>
                </div>
                <div className='col-span-5 row-span-6 flex flex-col justify-evenly'>
                    {pokemonInfo ?
                        [...Array(4)].map((e, i) =>
                            <AsyncPaginate
                                id={`move-select-${cardIndex}-${i}`}
                                key={`move-select-${cardIndex}-${i}`}
                                instanceId={`move-select-${cardIndex}-${i}`}
                                name={`move-${i}`}
                                onChange={moveOnChange}
                                loadOptions={loadMoveOptions}
                                placeholder={`Move ${i + 1}`}
                                className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'
                            />
                        ) : [...Array(4)].map((e, i) =>
                            <div className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'>
                                Move {i + 1}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}


