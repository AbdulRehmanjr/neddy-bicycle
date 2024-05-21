import { atomWithStorage } from 'jotai/utils';

const selectionInital: SelectionProps = {
    startDate: undefined,
    endDate: undefined,
    location: undefined,
    duration: 0,
    men: 0,
    ladies: 0,
    kids: 0,
    amount:0
}

export const selectionAtom = atomWithStorage('selectionAtom', selectionInital)
export const triggerAtom = atomWithStorage<boolean>('triggerAtom', false)