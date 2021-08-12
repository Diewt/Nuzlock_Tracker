import { GetStaticProps } from 'next'

import Container from '@/components/Container';
import PokeCard from '@/components/PokeCard';
import pokedex from '@/lib/pokeapi';

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/";

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

	const pokemonSprites: string[] = [];
	const pokemonOptions: PokemonOption[] = pokemonList.map(pokemon => {
		const name: string = pokemon.name;
		const spriteNum: string = pokemon.url.substring(pokemon.url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
		const spriteUrl: string = pokeSpriteUrl + spriteNum + ".png";
		pokemonSprites.push(spriteUrl);
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

export default function Home({ pokemonOptions }) {
	return (
		<Container>
			<PokeCard pokemonOptions={pokemonOptions} />
			<PokeCard pokemonOptions={pokemonOptions} />
		</Container>
	)
}