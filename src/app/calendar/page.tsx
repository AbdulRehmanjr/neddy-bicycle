import { BikeCalendar } from "~/app/_components/BikeCalendar";
import { GoBack } from "~/app/_components/GoBack";



export default function CalendarPage() {

    return (
        <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)] mb-40">
            <h1 className={`text-center text-3xl md:text-5xl font-ibm text-yellow mb-6 md:mb-16`}>
                Choose your rental period
            </h1>
            <div className=" flex justify-center items-center gap-14">
            <BikeCalendar />
            </div>
            <div className="container flex justify-start">
                <GoBack />
            </div>
        </section>
    )
}