import Pokedex from 'pokedex-promise-v2';

const options = {
    protocol: 'https',
    versionPath: '/api/v2/',
    cacheLimit: 86400000, // 1 day
    timeout: 5 * 1000, // 5s
}

const pokedex = new Pokedex(options);

export default pokedex;