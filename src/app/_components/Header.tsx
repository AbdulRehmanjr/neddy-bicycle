import Image from "next/image"



export const Header = ()=>{

    return (
        <header className="col-span-12 flex items-center gap-14 p-2">
            <Image src={'/logo.png'} alt="neddy logo" width={72} height={72}/>
            <h1 className="text-grey text-5xl font-libre font-extrabold tracking-tight">
                Nedy&apos;s Bicycle Rental
            </h1>
        </header>
    )
}