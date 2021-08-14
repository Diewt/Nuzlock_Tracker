import { GetStaticProps } from 'next'

import Container from '@/components/Container';
import PokeCard from '@/components/PokeCard';
import pokedex from '@/lib/pokeapi';
import { capitalize } from '@/lib/helper_functions';

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const itemSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

import { PokeResponse, Option } from '@/lib/interfaces';

// on build time, fetch whole list of pokemon and format options for the select
export const getStaticProps: GetStaticProps = async () => {
	const pokemonList: PokeResponse[] = (await pokedex.getPokemonsList()).results;
	const naturesList: PokeResponse[] = (await pokedex.getNaturesList()).results;
	const itemList: PokeResponse[] = (await pokedex.getItemsList()).results;

	const pokemonSprites = {}
	const pokemonOptions: Option[] = pokemonList.map(pokemon => {
		const name: string = pokemon.name;
		const spriteNum: string = pokemon.url.substring(pokemon.url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
		const spriteUrl: string = pokeSpriteUrl + spriteNum + ".png";
		pokemonSprites[name] = spriteUrl;
		const pokemonOption: Option = { value: name, label: capitalize(name) }

		return pokemonOption
	})

	const natureOptions: Option[] = naturesList.map(nature => {
		return { value: nature.name, label: capitalize(nature.name) } as Option
	})

	const itemSprites = {}
	const itemOptions: Option[] = itemList.map(item => {
		const name: string = item.name;
		const spriteUrl: string = itemSpriteUrl + item.name + '.png';
		itemSprites[name] = spriteUrl;
		
		return { value: item.name, label: capitalize(item.name)} as Option
	})

	return {
		props: {
			options: {
				pokemonOptions,
				natureOptions,
				itemOptions
			},
			pokemonSprites,
			itemSprites
		}
	}
}

export default function Home({ options, pokemonSprites, itemSprites }) {

	return (
		<Container>
			<PokeCard cardIndex={1} options={options} pokemonSprites={pokemonSprites} />
			<PokeCard cardIndex={2} options={options} pokemonSprites={pokemonSprites} />
		</Container>
	)
}