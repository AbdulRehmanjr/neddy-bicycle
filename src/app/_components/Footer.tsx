import Image from "next/image"




export const Footer = () => {


    return (
        <footer className="col-span-12  bg-yellow p-12">
            <div className="container flex justify-between items-center p-10">
                <div className="p-6">
                    <Image src={'/logo.png'} alt="neddy logo" width={112} height={112} />
                </div>
                <menu className="p-6 flex flex-col gap-7">
                    <li>Imprint</li>
                    <li>Contact</li>
                </menu>
                <div className="flex flex-col gap-4 p-6">
                    <p>© 2024 Nedy&apos;s Bicycle Rental.</p>
                    <p>All rights reserved.</p>
                    <p className="my-7">Made with love by Kolibri</p>
                </div>
            </div>
        </footer>
    )
}