import { useContext, useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Select from 'react-select';
import pokedex from "@/lib/pokeapi";
import { formatLabel } from "@/lib/helper_functions";
import { Option, PokeCardProps } from "@/lib/interfaces";
import { PokemonPartyContext } from "@/context/PokemonPartyContext";

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
        "EVs": [
            0,
            0,
            0,
            0,
            0,
            0
        ],
        "IVs": [
            31,
            31,
            31,
            31,
            31,
            31
        ],
        lvl: 100,
        base: true
    });

    let [moveSelects, setMoveSelects] = useState([]);

    const { pokemonParty, setPokemonParty } = useContext(PokemonPartyContext);

    useEffect(() => {
        if (pokemonParty[cardIndex].hasOwnProperty('pokemonInfo')) {
            setPokemonInfo(pokemonParty[cardIndex].pokemonInfo);
            setSelectedPokemon(pokemonParty[cardIndex].selectedPokemon);
        }

        if (pokemonParty[cardIndex].hasOwnProperty('userPokemonInfo'))
            setUserPokemonInfo(pokemonParty[cardIndex].userPokemonInfo);

    }, []);

    useEffect(() => {
        if (pokemonInfo) {
            if (pokemonParty[cardIndex].hasOwnProperty('userPokemonInfo') &&
                pokemonParty[cardIndex].userPokemonInfo.moves.length !== 0) {
                setMoveSelects([...Array(4)].map((e, i) =>
                    <AsyncPaginate
                        id={`move-select-${selectedPokemon.value}-${cardIndex}-${i}`}
                        key={`move-select-${selectedPokemon.value}-${cardIndex}-${i}`}
                        instanceId={`move-select-${selectedPokemon.value}-${cardIndex}-${i}`}
                        name={`move-${i}`}
                        onChange={moveOnChange}
                        loadOptions={loadMoveOptions}
                        placeholder={`Move ${i + 1}`}
                        className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'
                        defaultValue={{
                            label: formatLabel(pokemonParty[cardIndex].userPokemonInfo.moves[i]),
                            value: pokemonParty[cardIndex].userPokemonInfo.moves[i]
                        }}
                    />
                ));
            } else {
                setMoveSelects([...Array(4)].map((e, i) =>
                    <AsyncPaginate
                        id={`move-select-${selectedPokemon.value}-${cardIndex}-${i}`}
                        key={`move-select-${selectedPokemon.value}-${cardIndex}-${i}`}
                        instanceId={`move-select-${selectedPokemon.value}-${cardIndex}-${i}`}
                        name={`move-${i}`}
                        onChange={moveOnChange}
                        loadOptions={loadMoveOptions}
                        placeholder={`Move ${i + 1}`}
                        className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg'
                    />
                ));
            }
        } else {
            setMoveSelects([...Array(4)].map((e, i) =>
                <div className='col-span-5 row-span-1 box-border border-2 p-1 rounded-lg' key={`move-${i}`}>
                    Move {i + 1}
                </div>
            ));
        }
    }, [pokemonInfo]);

    useEffect(() => {
        if (selectedPokemon && pokemonInfo) {
            setPokemonParty([
                ...pokemonParty.slice(0, cardIndex),
                {
                    userPokemonInfo: userPokemonInfo,
                    selectedPokemon: selectedPokemon,
                    pokemonInfo: pokemonInfo
                },
                ...pokemonParty.slice(cardIndex + 1)
            ]);
        }
    }, [pokemonInfo, userPokemonInfo]);

    const changeLvl = (event) => {
        setUserPokemonInfo(prevState => { return { ...prevState, ["lvl"]: parseInt(event.target.value) } });
    }

    const changeNickname = (event) => {
        setUserPokemonInfo(prevState => { return { ...prevState, ["nickname"]: event.target.value } });
    }

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
            <p className="mt-4 transform translate-y-1">{label}</p>
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
        pokedex.getPokemonByName(option.value).then((response) => {
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
            "EVs": [
                0,
                0,
                0,
                0,
                0,
                0
            ],
            "IVs": [
                31,
                31,
                31,
                31,
                31,
                31
            ],
            lvl: 100,
            base: true
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

    //Plan for these two function is to later implement a button to switch display from base stats and calculated stats
    //Initial blueprint is to store the calculated stats into the userPokemonInfo 
    //Also to add bool flag to represent what stats should be displayed
    //Tie that element to a button somewhere on the card.
    //Before doing that we also need to figure out a way to get input for iv and evs for proper stat calculation
    //Gotta figure out how to add the iv and ev inputs into the card
    const statCalculation = (index) => {

        if (userPokemonInfo.base) {
            return pokemonInfo.stats[index].base_stat
        }


        //stat calculation for hp for gen 3 onward
        //Math.floor((2 * pokemonInfo.stats[index].base_stat + iv + Math.floor(ev/4) * userPokemonInfo.lvl)/100) + userPokemonInfo.lvl + 10
        if (index == 0) {
            let calc1 = (2 * pokemonInfo.stats[index].base_stat + userPokemonInfo.IVs[index] + Math.floor(userPokemonInfo.EVs[index] / 4)) * userPokemonInfo.lvl
            let calc2 = Math.floor(calc1 / 100)
            let calc3 = calc2 + userPokemonInfo.lvl + 10



            return calc3
        }
        //stat calcualtion for other stats for gen 3 onward
        //Math.floor((Math.floor((2 * pokemonInfo.stats[index].base_stat + iv + Math.floor(ev/4) * userPokemonInfo.lvl)/100) + 5) * natureBonus(index))
        else {
            let calc1 = (2 * pokemonInfo.stats[index].base_stat + userPokemonInfo.IVs[index] + Math.floor((userPokemonInfo.EVs[index] / 4))) * userPokemonInfo.lvl
            let calc2 = Math.floor(calc1 / 100) + 5
            let calc3 = Math.floor(calc2 * natureBonus(index))

            return calc3
        }

        //store calculation into appropriate slot in userPokemon info
    }

    //Incredibly rough implementation of how to check the nature bonuses since we are storing natures by name
    //Review later for improvements
    const natureBonus = (index) => {
        //neutral natures meaning no stat impact
        if (userPokemonInfo.nature == 'hardy' ||
            userPokemonInfo.nature == 'docile' ||
            userPokemonInfo.nature == 'serious' ||
            userPokemonInfo.nature == 'bashful' ||
            userPokemonInfo.nature == 'quirky'
        ) {
            return 1;
        }

        //natures affecting attack
        if (index == 1) {
            if (userPokemonInfo.nature == 'lonely' ||
                userPokemonInfo.nature == 'brave' ||
                userPokemonInfo.nature == 'adamant' ||
                userPokemonInfo.nature == 'naughty'
            ) {
                return 1.1;
            }
            else if (userPokemonInfo.nature == 'bold' ||
                userPokemonInfo.nature == 'timid' ||
                userPokemonInfo.nature == 'modest' ||
                userPokemonInfo.nature == 'calm'
            ) {
                return 0.9
            }
        }

        //natures affecting defense
        if (index == 2) {
            if (userPokemonInfo.nature == 'bold' ||
                userPokemonInfo.nature == 'relaxed' ||
                userPokemonInfo.nature == 'impish' ||
                userPokemonInfo.nature == 'lax'
            ) {
                return 1.1;
            }
            else if (userPokemonInfo.nature == 'lonely' ||
                userPokemonInfo.nature == 'hasty' ||
                userPokemonInfo.nature == 'mild' ||
                userPokemonInfo.nature == 'gentle'
            ) {
                return 0.9
            }
        }

        //natures affecting special attack
        if (index == 3) {
            if (userPokemonInfo.nature == 'modest' ||
                userPokemonInfo.nature == 'mild' ||
                userPokemonInfo.nature == 'quiet' ||
                userPokemonInfo.nature == 'rash'
            ) {
                return 1.1;
            }
            else if (userPokemonInfo.nature == 'adamant' ||
                userPokemonInfo.nature == 'impish' ||
                userPokemonInfo.nature == 'jolly' ||
                userPokemonInfo.nature == 'careful'
            ) {
                return 0.9
            }
        }

        //natures affecting special defense
        if (index == 4) {
            if (userPokemonInfo.nature == 'calm' ||
                userPokemonInfo.nature == 'gentle' ||
                userPokemonInfo.nature == 'sassy' ||
                userPokemonInfo.nature == 'careful'
            ) {
                return 1.1;
            }
            else if (userPokemonInfo.nature == 'rash' ||
                userPokemonInfo.nature == 'naive' ||
                userPokemonInfo.nature == 'lax' ||
                userPokemonInfo.nature == 'naughty'
            ) {
                return 0.9
            }
        }

        //natures affecting speed
        if (index == 5) {
            if (userPokemonInfo.nature == 'timid' ||
                userPokemonInfo.nature == 'hasty' ||
                userPokemonInfo.nature == 'jolly' ||
                userPokemonInfo.nature == 'naive'
            ) {
                return 1.1;
            }
            else if (userPokemonInfo.nature == 'brave' ||
                userPokemonInfo.nature == 'relaxed' ||
                userPokemonInfo.nature == 'quiet' ||
                userPokemonInfo.nature == 'sassy'
            ) {
                return 0.9
            }
        }

        return 1;
    }

    return (
        <div className='p-4'>
            <div className='box-border border-2 border-solid shadow-lg grid grid-cols-12 gap-1.5 row-auto max-w-2xl dark:bg-gray-600 dark:border-yellow-500 mt-8 p-2 relative rounded'>
                <label className='box-border border-2 border-solid rounded-bl-lg rounded-tr-lg shadow-lg dark:border-yellow-500 absolute -top-7 w-40 h-16 bg-white dark:bg-gray-700 transform skew-y-6 -rotate-6'>
                    <p className='ml-1 transform -skew-y-6 rotate-6'>Nickname:</p>
                    <input
                        type='text'
                        placeholder=''
                        className='w-36 bg-gray-300 dark:bg-gray-500 ml-1 mt-2 pl-1 transform -skew-y-6 rotate-6'
                        onChange={changeNickname}
                        value={pokemonParty[cardIndex]?.userPokemonInfo?.nickname} />
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
                            Level: <input className="w-8 p-0.5" value={userPokemonInfo.lvl} name="lvl" onChange={changeLvl} />
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
                        value={{ label: formatLabel(userPokemonInfo?.item), value: userPokemonInfo?.item }}
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
                    <div className='grid grid-cols-7 row-span-6 gap-y-2'>

                        <label className='col-span-1'>Hp</label>
                        <div className='col-span-5'> bar placeholder </div>
                        <div className='col-span-1 place-self-end'> {pokemonInfo ? statCalculation(0) : 0} </div>

                        <label className='col-span-1'>Atk</label>
                        <div className='col-span-5'>bar placeholder</div>
                        <div className='col-span-1 place-self-end'> {pokemonInfo ? statCalculation(1) : 0} </div>

                        <label className='col-span-1'>Def</label>
                        <div className='col-span-5'>bar placeholder</div>
                        <div className='col-span-1 place-self-end'> {pokemonInfo ? statCalculation(2) : 0} </div>

                        <label className='col-span-1'>Spa</label>
                        <div className='col-span-5'>bar placeholder</div>
                        <div className='col-span-1 place-self-end'> {pokemonInfo ? statCalculation(3) : 0} </div>

                        <label className='col-span-1'>Spd</label>
                        <div className='col-span-5'>bar placeholder</div>
                        <div className='col-span-1 place-self-end'> {pokemonInfo ? statCalculation(4) : 0} </div>

                        <label className='col-span-1'>Spe</label>
                        <div className='col-span-5 bg-red-900 rounded-xl'>bar placeholder</div>
                        <div className='col-span-1 place-self-end'> {pokemonInfo ? statCalculation(5) : 0} </div>

                        <div className='col-span-1'> </div>
                        <div className='col-span-5 place-self-center box-border border-2 rounded-md w-64 text-center border-black'>
                            <button
                                type='button'
                                onClick={() => setUserPokemonInfo(prevState => { return { ...prevState, base: !prevState.base } })}
                            >
                                {userPokemonInfo.base ? 'Change to view Calculated Stats' : 'Change to view Base Stats'}
                            </button>
                        </div>
                        <div className='col-span-1'> </div>

                    </div>
                </div>
                <div className='col-span-5 row-span-6 flex flex-col justify-evenly'>
                    {
                        moveSelects.map((moveSelect, index) => <div key={index}>{moveSelect}</div>)
                    }
                </div>
            </div>
        </div>
    );
}


