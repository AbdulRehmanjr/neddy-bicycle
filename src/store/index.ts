import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface BookingStore {
  bookingId: string
  selection: SelectionProps
  trigger: boolean
  setBookingId: (id: string) => void
  setSelection: (selection: Partial<SelectionProps>) => void
  setTrigger: (trigger: boolean) => void
}

const selectionInitial: SelectionProps = {
  startDate: undefined,
  endDate: undefined,
  location: undefined,
  duration: 0,
  men: 0,
  ladies: 0,
  kids: 0,
  amount: 0,
  firstName: 'none',
  lastName: 'none',
  email: 'none',
  phone: 'none',
  guesthouse: 'none',
  arrivalTime: 'none',
  additional: 'none',
  info: 'none',
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      bookingId: '',
      selection: selectionInitial,
      trigger: false,
      setBookingId: (id) => set({ bookingId: id }),
      setSelection: (newSelection) => set((state) => ({ selection: { ...state.selection, ...newSelection } })),
      setTrigger: (newTrigger) => set({ trigger: newTrigger }),
    }),
    {
      name: 'neddyBookingStore',
    }
  )
)