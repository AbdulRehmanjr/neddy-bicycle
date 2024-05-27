import { BookingForm } from "~/app/_components/BookingForm";
import { AmountDetail } from "~/app/_components/AmountDetail";
import { GoBack } from "~/app/_components/GoBack";

export default function BookingPage() {

    return (
        <section className="col-span-12 flex flex-col gap-14 min-h-[calc(100vh_-_124px)] mb-16">
            <div className="flex flex-col md:flex-row justify-center   gap-20 p-6">
                <BookingForm />
                <AmountDetail />
            </div>
            <div className="container justify-start">
                <GoBack />
            </div>
        </section>
    )
}