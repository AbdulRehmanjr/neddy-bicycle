'use client'

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import dayjs, { type Dayjs } from 'dayjs'
import { Button } from "~/components/ui/button"
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export const BikeCalendar = () => {

    const router = useRouter()
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
    const [rangeStart, setRangeStart] = useState<Dayjs | null>(null);
    const [rangeEnd, setRangeEnd] = useState<Dayjs | null>(null);

    const currentMonth: Dayjs[][] = useMemo(() => {
        const currentMonth = selectedDate || dayjs()
        const firstDay = currentMonth.clone().startOf('month').day()
        const daysInMonth = currentMonth.daysInMonth()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const emptyDaysBefore: Dayjs[] = Array(firstDay).fill(null)
        const currentMonthDays: Dayjs[] = Array.from({ length: daysInMonth }, (_, i) => dayjs(currentMonth).date(i + 1));
        const calendarGrid: Dayjs[] = [...emptyDaysBefore, ...currentMonthDays]
        const weekgrid: Dayjs[][] = []
        const chunkSize = 7
        for (let i = 0; i < calendarGrid.length; i += chunkSize)
            weekgrid.push(calendarGrid.slice(i, i + chunkSize))
        return weekgrid
    }, [selectedDate])

    const handlePreviousMonth = () => {
        const newDate = selectedDate || dayjs()
        setSelectedDate(newDate.clone().subtract(1, 'month'));
    }

    const handleNextMonth = () => {
        const newDate = selectedDate || dayjs()
        setSelectedDate(newDate.clone().add(1, 'month'));
    }

    const handleDateClick = (date: Dayjs) => {

        if (rangeStart === null) {
            setRangeStart(date)
        }
        else if (rangeEnd === null && !date.isBefore(rangeStart, "day")) {
            setRangeEnd(date)
        }
        else {
            setRangeStart(null)
            setRangeEnd(null)
        }
    }

    const isInRange = (date: Dayjs) => {
        if (!rangeStart || !rangeEnd) return false;
        return date.isBetween(rangeStart, rangeEnd, "day")
    }

    const handleProceed = () => {
        router.push("/location")
    }


    const DateTemplate = ({ date }: { date: Dayjs }) => {

        if (!date) return <td className='border-[1px] border-gray-900'></td>


        const isPast = date.isBefore(dayjs(), 'day')
        const isStart = rangeStart?.isSame(date, "day");
        const isEnd = rangeEnd?.isSame(date, "day");
        const currentPrice = '100'

        return (
            <td className='relative border-[1px] border-gray-900 w-[1.5rem] h-[3rem] md:w-[4rem] md:h-[6rem]'>
                <button type="button"
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    className={`absolute top-0 left-0 w-full h-full ${(isInRange(date) || isStart || isEnd) && 'bg-yellow text-white'}`}
                    disabled={isPast}
                    onClick={() => {
                        handleDateClick(date)
                    }}
                >
                    <p className={`flex flex-col gap-1 ${isPast && 'text-gray-400'}`}>
                        <span className="font-bold">{date.date()}</span>
                        {!isPast && <span>{currentPrice} €</span>}
                        {/* {isReserved && <span>N/A</span>} */}
                    </p>
                </button>
            </td>
        )
    }
    return (
        <div className={`text-yellow font-ibm flex flex-col items-center gap-2 transition duration-300 ease-in-out p-2 `}>
            <div className="flex font-bold items-center justify-between gap-4 text-lg w-full">
                <Button onClick={handlePreviousMonth} className="bg-yellow hover:bg-yellow">Prev</Button>
                <p className="text-yellow font-extrabold">{selectedDate ? selectedDate.format('MMMM YYYY') : dayjs().format('MMMM YYYY')}</p>
                <Button onClick={handleNextMonth} className="bg-yellow hover:bg-yellow">Prev</Button>
            </div>
            <table className='rounded-md'  >
                <thead>
                    <tr className='text-xs sm:text-sm md:text-base lg:text-lg '>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Sun</th>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Mon</th>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Tue</th>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Wed</th>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Thu</th>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Fri</th>
                        <th className="p-2 min-w-[4rem] md:min-w-[6rem]">Sat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentMonth?.map((data: Dayjs[], index: number) => (
                            <tr key={index} className='text-center text-xs sm:text-sm md:text-base lg:text-lg hover:cursor-pointer'>
                                {
                                    data.map((date: Dayjs, index: number) => (
                                        <DateTemplate key={index} date={date} />
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                (rangeStart && rangeEnd) &&
                <Button onClick={handleProceed} className="bg-yellow hover:bg-yellow">
                    Continue
                </Button>
            }

        </div>
    )
}