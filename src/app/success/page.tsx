import Link from "next/link";
import Image from "next/image";

export default function SuccessPage() {

    return (
        <section className="col-span-12 flex flex-col justify-center items-center gap-6 min-h-[calc(100vh_-_124px)] p-10">
            <Image src="/logo.png" className="w-[20rem] md:w-[30rem]  aspect-video " width={400} height=
                {400} alt="Logo Image" />
            <h1 className="text-2xl md:text-4xl text-center">Thank you for your booking!</h1>
            <h2 className='text-lg md:text-2xl text-center'>The payment was successful and you will receive a confirmation email.</h2>
            <Link href={'/'} className='text-base bg-yellow rounded-md text-white  p-2 text-center'>Go back to website</Link>
            <p>We are looking forward to welcoming you soon!</p>
        </section>
    )
}