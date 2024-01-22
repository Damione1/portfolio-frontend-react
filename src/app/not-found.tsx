import Link from 'next/link'
import Image from 'next/image'

const NotFound = () => {

    return (
        <div className="bg-indigo-900 relative overflow-hidden h-screen">
            <Image src="./404.svg" className="absolute h-full w-full object-cover" layout="fill" alt="404" />
            <div className="inset-0 bg-black opacity-25 absolute" />
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div className="w-full font-mono flex flex-col items-center relative z-10">
                    <h1 className="font-extrabold text-5xl text-center text-white leading-tight mt-4">
                        {`You're alone here`}
                    </h1>
                    <p className="font-extrabold text-8xl my-44 text-white animate-bounce">
                        Page not found
                    </p>
                    <Link href="/" className="text-white">
                        Back to home page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
