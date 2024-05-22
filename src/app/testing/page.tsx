import { redirect } from "next/navigation"
import { api } from "~/trpc/server"


export default async function GoogleCalendarPage() {

    const calendar = await api.calendar.googleOAuth()
    redirect(calendar)
}