import { atomWithStorage } from 'jotai/utils';

const selectionInital : SelectionProps = {
    option: undefined,
    location: undefined
}


export const selectionAtom  = atomWithStorage('selectionAtom', selectionInital)