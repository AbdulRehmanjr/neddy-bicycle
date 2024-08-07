'use client'

import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import dayjs, { type Dayjs } from 'dayjs'
import { Button } from "~/components/ui/button"
import isBetween from 'dayjs/plugin/isBetween'
import {  useBookingStore } from "~/store"

dayjs.extend(isBetween)

type RangeProps = {
    rangeStart: Dayjs | null
    rangeEnd: Dayjs | null
}

export const BikeCalendar = () => {

    const router = useRouter()
    
    const {selection,setSelection} = useBookingStore()
    const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
    const [range, setRange] = useState<RangeProps>({ rangeStart: null, rangeEnd: null })
    const [durations, setDuration] = useState<number>(1)

    const currentMonth: Dayjs[][] = useMemo(() => {
        const currentMonth = selectedDate || dayjs()
        const firstDay = currentMonth.clone().startOf('month').day()
        const daysInMonth = currentMonth.daysInMonth()
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const emptyDaysBefore: Dayjs[] = Array(firstDay).fill(null)
        const currentMonthDays: Dayjs[] = Array.from({ length: daysInMonth }, (_, i) => dayjs(currentMonth).date(i + 1))
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

    const calculatePrice = (duration: number) => {
        let subTotal = 0
        const prices = {
            1: 10,
            2: 7,
        }

        if (duration >= 2)
            subTotal = (selection.men * prices['2'] + selection.ladies * prices['2'] + selection.kids * prices['2'])
        else
            subTotal = (selection.men * prices['1'] + selection.ladies * prices['1'] + selection.kids * prices['1'])

        return subTotal
    }

    const handleDateClick = (date: Dayjs) => {

        if (range.rangeStart === null) {
            const price = calculatePrice(1)
            setRange((prev) => ({ ...prev, rangeStart: date, rangeEnd: date }))
            setSelection({startDate: date.format('YYYY-MM-DD'), endDate: date.format('YYYY-MM-DD'), duration: 1,amount:price })
        }
        else if (!date.isBefore(range.rangeStart, "day")) {
            setRange((prev) => ({ ...prev, rangeEnd: date }))
            const duration = dayjs(date).diff(dayjs(range.rangeStart), 'days') + 1
            const price = calculatePrice(duration)
            if (duration >= 7) {
                setDuration(() => duration + 1)
                const newRangeEnd = dayjs(date).add(1, 'day')
                setSelection({ endDate: newRangeEnd.format('YYYY-MM-DD'), duration: duration + 1, amount: price * duration })
            } else {
                setDuration(() => duration)
                setSelection({ endDate: date.format('YYYY-MM-DD'), duration: duration, amount: price * duration })
            }

        }
        else {
            setRange(() => ({ rangeStart: null, rangeEnd: null }))
            setSelection({ startDate: 'none', endDate: 'none' })
        }
    }

    const isInRange = (date: Dayjs) => {
        if (!range.rangeStart || !range.rangeEnd) return false
        return date.isBetween(range.rangeStart, range.rangeEnd, "day")
    }

    const handleProceed = () => { router.push("/location") }

    const DateTemplate = ({ date }: { date: Dayjs }) => {

        if (!date) return <td className='border-[1px] border-gray-300'></td>

        const isPast = date.isBefore(dayjs(), 'day')
        const isStart = range.rangeStart?.isSame(date, "day");
        const isEnd = range.rangeEnd?.isSame(date, "day");
        const currentPrice = calculatePrice(durations)

        return (
            <td className='relative border-[1px] border-gray-300 w-[1.3rem] h-[4rem] md:w-[4rem] md:h-[6rem]'>
                <button type="button"
                    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                    className={`absolute top-0 left-0 w-full h-full ${(isInRange(date) || isStart || isEnd) && 'bg-yellow text-white'}`}
                    disabled={isPast}
                    onClick={() => { handleDateClick(date) }}
                >
                    <div className={`flex flex-col gap-1 ${isPast && 'text-gray-300'}`}>
                        <span className="font-bold">{date.date()}</span>
                        {!isPast
                            &&
                            <p className="text-xs ">
                                <span>{currentPrice}</span> <span>€</span>
                            </p>
                        }
                        {/* {isReserved && <span>N/A</span>} */}
                    </div>
                </button>
            </td>
        )
    }

    return (
        <div className={`text-dim-grey font-ibm flex flex-col items-center gap-10 transition duration-300 ease-in-out p-2 `}>
            <div className="flex font-bold items-center justify-between gap-4 text-lg w-full">
                <Button onClick={handlePreviousMonth} className="bg-yellow hover:bg-yellow-hover p-6">Prev</Button>
                <p className="text-yellow font-extrabold">{selectedDate ? selectedDate.format('MMMM YYYY') : dayjs().format('MMMM YYYY')}</p>
                <Button onClick={handleNextMonth} className="bg-yellow hover:bg-yellow-hover p-6">Next</Button>
            </div>
            <table className='rounded-md'>
                <thead>
                    <tr className='text-xs sm:text-sm md:text-base lg:text-lg '>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Sun</th>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Mon</th>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Tue</th>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Wed</th>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Thu</th>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Fri</th>
                        <th className="p-2 min-w-[3.2rem] md:min-w-[6rem]">Sat</th>
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
                range.rangeStart &&
                <Button onClick={handleProceed} className="bg-yellow hover:bg-yellow-hover p-6">
                    Continue
                </Button>
            }
        </div>
    )
}