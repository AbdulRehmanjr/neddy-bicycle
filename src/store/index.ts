import { atomWithStorage } from 'jotai/utils';

const selectionInital: SelectionProps = {
    startDate: undefined,
    endDate: undefined,
    location: undefined,
    duration: 0,
    men: 0,
    ladies: 0,
    kids: 0,
    amount:0,
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    guesthouse:'',
    arrivalTime:'',
    additional:'',
    info:'',
}

export const bookingId = atomWithStorage<string>('neddyBookingAtom','')
export const selectionAtom = atomWithStorage<SelectionProps>('neddySelectionAtom', selectionInital)
export const triggerAtom = atomWithStorage<boolean>('neddyTriggerAtom', false)