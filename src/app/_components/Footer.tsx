import Image from "next/image"
import Link from "next/link"




export const Footer = () => {


    return (
        <footer className="col-span-12 text-ibm bg-yellow p-12">
            <div className="container flex flex-col md:flex-row justify-between items-center text-xs p-10">
                <div className="p-6">
                    <Image src={'/logo.png'} alt="neddy logo" width={112} height={112} />
                </div>
                <menu className="p-6 flex flex-col gap-7">
                    <li className="hover:cursor-pointer hover:text-white">
                        <Link href={' https://www.nedysbicycle.com/imprint'} target="_blank">Imprint</Link>
                    </li>
                    <li className="hover:cursor-pointer hover:text-white">
                        <Link href={'https://www.nedysbicycle.com/contact'} target="_blank">Contact</Link>
                    </li>
                </menu>
                <div className="flex flex-col gap-4 p-6">
                    <p>© 2024 Nedy&apos;s Bicycle Rental.</p>
                    <p>All rights reserved.</p>
                    <Link className="hover:cursor-pointer hover:text-white my-7" href={'https://www.kolibri-bs.com '} target="_black">Made with love by Kolibri</Link>
                </div>
            </div>
        </footer>
    )
}