import VirtualizedSelect from 'react-virtualized-select'

export default function PokeCard({ pokemonOptions }) {

    return (
        <div className='p-4'>
            <div className='box-border border-2 border-solid shadow-lg grid grid-cols-12 gap-1.5 row-auto max-w-md dark:bg-gray-600 dark:border-yellow-500 mt-8 p-2 relative rounded'>
                <label className='box-border border-2 border-solid rounded-bl-lg rounded-tr-lg shadow-lg dark:border-yellow-500 absolute -top-7 w-40 h-16 bg-white dark:bg-gray-700 transform skew-y-6 -rotate-6'>
                    <p className='ml-1 transform -skew-y-6 rotate-6'>Nickname:</p>
                    <input type='text' placeholder='' className='w-36 bg-gray-300 dark:bg-gray-500 ml-1 mt-2 pl-1 transform -skew-y-6 rotate-6'/>
                </label>
                <div className='col-span-5 row-span-1'/>
                <VirtualizedSelect options={pokemonOptions} className='col-span-7 row-span-1'/>
                <div className='col-span-5 row-span-5'>
                    image
                </div>
                <div className='col-span-7 row-span-1'>
                    Route
                </div>
                <div className='col-span-7 row-span-1'>
                    Ability
                </div>
                <div className='col-span-7 row-span-1'>
                    Nature
                </div>
                <div className='col-span-7 row-span-1'>
                    Item
                </div>
            </div>
        </div>
    );
}


