import Link from "next/link";

export default function SuccessPage() {

    return (
        <section className="col-span-12 flex flex-col justify-center items-center gap-6 min-h-[calc(100vh_-_124px)] p-10">
            <h1 className="text-2xl md:text-4xl text-center font-ibm text-yellow">Thanks for renting bicycles with us! </h1>
            <h2 className='text-lg md:text-2xl text-center font-libre text-dim-grey'>You will receive a booking confirmation email soon. We are looking forward to seeing you soon on La Digue!</h2>
            <Link href={'/'} className='text-base bg-yellow rounded-md text-white  p-2 text-center'>Go back to website</Link>
        </section>
    )
}