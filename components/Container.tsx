import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';

import Footer from '@/components/Footer';

export default function Container(props) {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();

    // After mounting, we have access to the theme
    useEffect(() => setMounted(true), []);

    const { children, ...customMeta } = props;
    const meta = {
        title: 'nuzlog - A nuzlocke tracker',
        description: `Nuzlocke Tracker written using React/Next.js`,
        image: '/favicon.ico',
        type: 'website',
        ...customMeta
    };

    return (
        <div className="bg-white dark:bg-black">
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index" />
                <meta content={meta.description} name="description" />
                <meta name="keywords" content="nuzlocke, tracker, nuzlog" />
                <meta name="author" content="Chris Diewtragulchai, Stone Sha" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:type" content={meta.type} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:title" content={meta.title} />
                <meta property="og:image" content={meta.image} />
                {meta.date && (
                    <meta property="article:published_time" content={meta.date} />
                )}
            </Head>
            <nav className='flex flex-row w-full items-center justify-between dark:bg-black h-20 px-4 shadow-lg'>

                <div className="flex flex-row p-2">
                    <p className="text-4xl mr-2">Nuzlog</p>
                    {mounted && resolvedTheme === 'dark' ?
                        <Image src="/pokeball-inverted.svg" height={35} width={35} /> :
                        <Image src="/pokeball.svg" height={35} width={35} />}
                </div>

                <Link href="/"><a className="text-lg">Home</a></Link>

                <Link href="/"><a className="text-lg">About</a></Link>

                <Link href="/"><a className="text-lg">Profile</a></Link>

                <Link href="/"><a className="text-lg">Community</a></Link>

                <div>
                    <button
                        aria-label="Toggle Dark Mode"
                        type="button"
                        className="w-20 h-12 p-3 bg-gray-200 rounded dark:bg-gray-800"
                        onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                    >
                        {mounted && resolvedTheme === 'dark' ?
                            <Image src="/pokeball-inverted.svg" height={25} width={25} /> :
                            <Image src="/pokeball.svg" height={25} width={25} />}
                    </button>
                </div>

            </nav>
            <main>
                {children}
                <Footer />
            </main>
        </div>
    );
}