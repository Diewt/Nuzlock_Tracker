import { GetStaticProps } from 'next'
import { useMemo, useState } from 'react';

import Container from '@/components/Container';
import PokeParty from '@/components/PokeParty';
import { PokemonPartyContext } from '@/context/PokemonPartyContext';
import { fetchResources } from '@/lib/helper_functions';
import { HomeProps } from '@/lib/interfaces';

// on build time, fetch whole list of pokemon and format options for the select
export const getStaticProps: GetStaticProps = async () => {

	const resources = await fetchResources();

	return {
		props: {
			options: resources.options,
			sprites: resources.sprites
		}
	}
}

export default function Home({ options, sprites }: HomeProps) {

	const [pokemonParty, setPokemonParty] = useState([{}, {}, {}, {}, {}, {}]);

	const pokemonPartyProvider = useMemo(() => ({ pokemonParty, setPokemonParty }), [pokemonParty, setPokemonParty])

	return (
		<Container>
			<div className="min-h-full h-96 max-h-full p-4">
				<h1 className="text-2xl">Party Tracker</h1>
				<PokemonPartyContext.Provider value={pokemonPartyProvider}>
					<PokeParty options={options} sprites={sprites} />
				</PokemonPartyContext.Provider>
			</div>
		</Container>
	)
}