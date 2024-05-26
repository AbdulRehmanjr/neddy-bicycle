import { BookingForm } from "~/app/_components/BookingForm";
import { AmountDetail } from "~/app/_components/AmountDetail";
import { GoBack } from "~/app/_components/GoBack";

export default function BookingPage() {

    return (
        <section className="col-span-12 grid grid-cols-2 content-center place-self-center gap-20 min-h-[calc(100vh_-_124px)]">
            <div className="col-span-2 container justify-start">
                <GoBack />
            </div>
            <BookingForm />
            <AmountDetail />
        </section>
    )
}