import {
  GET_NOTE
} from './types'

export function getNote(note) {
    return {
        type: GET_NOTE,
        payload: note
    }
}
