import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
            <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-4" />
            <div className="flex flex-row w-full justify-center space-x-4 mb-8">

                <Link href="/">Home</Link>

                <Link href="/">About</Link>

                <Link href="/">Profile</Link>

                <Link href="/">Community</Link>

            </div>
        </footer>
    );
}