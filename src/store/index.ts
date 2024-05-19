import { atomWithStorage } from 'jotai/utils';

const selectionInital : SelectionProps = {
    option: undefined,
    location: undefined,
    men:0,
    ladies:0,
    kids:0
}

export const selectionAtom  = atomWithStorage('selectionAtom', selectionInital)