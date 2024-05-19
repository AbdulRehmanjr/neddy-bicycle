import { BookingForm } from "~/app/_components/BookingForm";
import { AmountDetail } from "~/app/_components/AmountDetail";

export default function BookingPage() {

    return (
        <section className="col-span-12 grid grid-cols-2 content-center  place-self-center gap-20  min-h-[calc(100vh_-_64px)]">
            <BookingForm />
            <AmountDetail />
        </section>
    )
}