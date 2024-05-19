import { atomWithStorage } from 'jotai/utils';

const selectionInital : SelectionProps = {
    option: undefined
}


export const selectionAtom  = atomWithStorage('selectionAtom', selectionInital)