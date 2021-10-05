import { GetStaticPaths, GetStaticProps } from 'next'

import Container from '@/components/Container';
import { supabase } from '@/lib/supabase';
import PokeParty from '@/components/PokeParty';
import { fetchResources } from '@/lib/helper_functions';

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [], // indicates that no page needs to be created at build time
        fallback: 'blocking' // indicates type of fallback
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    // fetch pokemon party based on uuid in url slug
    let { data, error } = await supabase.from('pokeparty').select('*').eq('uuid', params.id);
    const resources = await fetchResources();

    return {
        props: {
            data: data,
            error: error,
            options: resources.options,
            sprites: resources.sprites
        }
    }
}

export default function Party({ data, error, options, sprites }) {

    // TODO: implement displaying fetched pokemon party

    return (
        <Container>
            {error ?
                <h1>Couldn't Load Party</h1> :
                <PokeParty options={options} sprites={sprites} />
            }
        </Container>
    )
}