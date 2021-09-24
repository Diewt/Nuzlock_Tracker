export interface PokeResponse {
    name: string,
    url: string
}

export interface Option {
    value: string,
    label: string
}

export interface Sprites {
    [name: string]: string
}

export interface HomeProps {
    options: [Option],
    sprites: [Sprites]
}

export interface PokeCardProps {
    cardIndex: number,
    [key: string]: any
}