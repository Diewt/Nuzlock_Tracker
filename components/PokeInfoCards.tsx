
export default function PokeInfoCard() {

    return (
        <div className='p-4'>
            <div className='max-w-sm rounded overflow-hidden shadow-lg bg-white grid grid-cols-2 border-solid border-2 border-grey-700'>
                <div className='grid grid-rows-4'>
                    <input className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none' type="text" placeholder="Pokemon" aria-label="Pokemon name">
                        
                    </input>
                    <div>
                        image
                    </div>
                    <div>
                        Ability
                    </div>
                    <div>
                        Route
                    </div>
                </div>
                <div className='grid grid-rows-5'>
                    <div>
                        item
                    </div>
                    <div>
                        Move 1
                    </div>
                    <div>
                        Move 2
                    </div>
                    <div>
                        Move 3
                    </div>
                    <div>
                        Move 4
                    </div>
                </div>
            </div>
        </div>
    );
}


