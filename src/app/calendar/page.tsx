import { BikeCalendar } from "~/app/_components/BikeCalendar";



export default function CalendarPage() {

    return (
        <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)]">
            <h1 className={`text-center font-extrabold text-5xl font-libre text-yellow`}>
                Choose dates
            </h1>
            <div className=" flex justify-center items-center gap-14">
                <BikeCalendar />
            </div>
        </section>
    )
}