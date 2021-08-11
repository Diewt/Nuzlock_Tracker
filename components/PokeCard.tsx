import VirtualizedSelect from 'react-virtualized-select'

export default function PokeCard({ pokemonOptions }) {

    return (
        <div className='p-4'>
            <VirtualizedSelect options={pokemonOptions} />
        </div>
    );
}


