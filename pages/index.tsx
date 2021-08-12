import { GetStaticProps } from 'next'

import Container from '@/components/Container';
import PokeCard from '@/components/PokeCard';
import pokedex from '@/lib/pokeapi';

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

interface Pokemon {
	name: string,
	url: string
}

interface PokemonOption {
	value: string,
	label: string,
}

export const getStaticProps: GetStaticProps = async () => {
	const pokemonList: Pokemon[] = (await pokedex.getPokemonsList()).results;

	const pokemonSprites = {}
	const pokemonOptions: PokemonOption[] = pokemonList.map(pokemon => {
		const name: string = pokemon.name;
		const spriteNum: string = pokemon.url.substring(pokemon.url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
		const spriteUrl: string = pokeSpriteUrl + spriteNum + ".png";
		pokemonSprites[name] = spriteUrl;
		const pokemonOption: PokemonOption = { value: name, label: name.charAt(0).toUpperCase() + name.slice(1) }

		return pokemonOption
	})

	return {
		props: {
			pokemonOptions,
			pokemonSprites
		}
	}
}

export default function Home({ pokemonOptions, pokemonSprites }) {
	return (
		<Container>
			<PokeCard pokemonOptions={pokemonOptions} pokemonSprites={pokemonSprites} />
			<PokeCard pokemonOptions={pokemonOptions} pokemonSprites={pokemonSprites} />
		</Container>
	)
}