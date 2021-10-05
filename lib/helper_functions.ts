import { PokeResponse, Option, Sprites } from '@/lib/interfaces';
import pokedex from '@/lib/pokeapi';

const pokeSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
const itemSpriteUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/';

export const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const formatLabel = (str: string): string => {
    return str.split("-").map(temp => capitalize(temp)).join(" ");
}

export const fetchResources = async () => {
    const pokemonList: PokeResponse[] = (await pokedex.getPokemonsList()).results;
    const naturesList: PokeResponse[] = (await pokedex.getNaturesList()).results;
    const itemList: PokeResponse[] = (await pokedex.getItemsList()).results;

    const pokemonSprites: Sprites = {};
    const pokemonOptions: Option[] = pokemonList.map(pokemon => {
        const name: string = pokemon.name;
        const spriteNum: string = pokemon.url.substring(pokemon.url.slice(0, -1).lastIndexOf('/') + 1).slice(0, -1);
        const spriteUrl: string = pokeSpriteUrl + spriteNum + ".png";
        pokemonSprites[name] = spriteUrl;

        return { value: name, label: formatLabel(name) } as Option;
    });

    const natureOptions: Option[] = naturesList.map(nature => {
        return { value: nature.name, label: formatLabel(nature.name) } as Option;
    });

    const itemSprites: Sprites = {};
    const itemOptions: Option[] = itemList.map(item => {
        const name: string = item.name;
        const spriteUrl: string = itemSpriteUrl + item.name + '.png';
        itemSprites[name] = spriteUrl;

        return { value: name, label: formatLabel(name) } as Option;
    });

    return {
        options: {
            pokemonOptions,
            natureOptions,
            itemOptions
        },
        sprites: {
            pokemonSprites,
            itemSprites
        }
    }
}