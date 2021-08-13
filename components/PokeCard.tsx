import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

export default function PokeCard({ pokemonOptions, pokemonSprites }) {

    // placeholders for later implementation of select functionality
    let [selectedPokemon, onChange] = useState(null);

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

    return (
        <div className='p-4'>
            <div className='box-border border-2 border-solid shadow-lg grid grid-cols-12 gap-1.5 row-auto max-w-md dark:bg-gray-600 dark:border-yellow-500 mt-8 p-2 relative rounded'>
                <label className='box-border border-2 border-solid rounded-bl-lg rounded-tr-lg shadow-lg dark:border-yellow-500 absolute -top-7 w-40 h-16 bg-white dark:bg-gray-700 transform skew-y-6 -rotate-6'>
                    <p className='ml-1 transform -skew-y-6 rotate-6'>Nickname:</p>
                    <input type='text' placeholder='' className='w-36 bg-gray-300 dark:bg-gray-500 ml-1 mt-2 pl-1 transform -skew-y-6 rotate-6' />
                </label>
                <div className='col-span-5 row-span-1' />
                <AsyncPaginate
                    formatOptionLabel={formatOptionLabel}
                    value={selectedPokemon}
                    loadOptions={loadOptions}
                    onChange={onChange}
                    className="col-span-7 row-span-1"
                />
                <div className='col-span-5 row-span-5'>
                    <p>{selectedPokemon?.label}</p>
                    <img src={selectedPokemon ? `http://play.pokemonshowdown.com/sprites/xyani/${selectedPokemon.value}.gif` : "https://play.pokemonshowdown.com/sprites/bw/0.png"} />
                </div>
                <div className='col-span-7 row-span-1 box-border border-2 p-1 rounded-lg'>
                    Ability
                </div>
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
                        <div className='justify-self-end'>Value</div>
                        <div>
                            Atk
                        </div>
                        <div></div>
                        <div className='justify-self-end'>Value</div>
                        <div>
                            Def
                        </div>
                        <div></div>
                        <div className='justify-self-end'>Value</div>
                        <div>
                            Spa
                        </div>
                        <div></div>
                        <div className='justify-self-end'>Value</div>
                        <div>
                            Spd
                        </div>
                        <div></div>
                        <div className='justify-self-end'>Value</div>
                        <div>
                            Spe
                        </div>
                        <div></div>
                        <div className='justify-self-end'>Value</div>
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


