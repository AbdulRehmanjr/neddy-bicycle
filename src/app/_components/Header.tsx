import Image from "next/image"



export const Header = ()=>{

    return (
        <header className="col-span-12 flex items-center px-10 py-5">
            <Image src={'/logo.png'} alt="neddy logo" width={72} height={72}/>
        </header>
    )
}