import Image from "next/image"
import Link from "next/link"



export const Header = () => {

    return (
        <header className="col-span-12 flex items-center px-10 py-5 mb-16 md:mb-0">
            <Link href={`https://www.nedysbicycle.com/`}>
                <Image className="w-[3.5rem] h-[3.5rem] md:w-[4.5rem] md:h-[4.5rem]" src={'/logo.png'} alt="neddy logo" width={72} height={72} />
            </Link>
        </header>
    )
}