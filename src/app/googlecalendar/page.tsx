import { SessionSet } from "../_components/GoogleCalendar";


export default function CalendarSuccessPage({ searchParams }: { searchParams: { code: string } }) {

    return (
        <section className="h-fit">
            <SessionSet token={searchParams.code} />
        </section>
    );
}