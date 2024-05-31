import { BikeCalendar } from "~/app/_components/BikeCalendar";
import { GoBack } from "~/app/_components/GoBack";



export default function CalendarPage() {

    return (
        <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)] mb-40">
            <h1 className={`text-center text-3xl md:text-5xl font-ibm text-yellow mb-6 md:mb-16`}>
                Choose your rental period
            </h1>
            <div className="flex flex-col items-center gap-2 font-libre text-dim-grey text-sm md:text-lg p-4">
                <p>7+1 days discount - rent bicycles for 7</p>
                <p>or more days and you will get one day for free</p>
            </div>
            <div className=" flex justify-center items-center gap-14">
                <BikeCalendar />
            </div>
            <div className="container flex justify-start">
                <GoBack />
            </div>
        </section>
    )
}