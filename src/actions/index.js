import { SIGNED_IN, DELETE_ALL } from '../constants';
export const logUser = (email) => {
    return {
        type: SIGNED_IN,
        email
    }
}

export const deleteAll = () => {
    return {
        type: DELETE_ALL
    }
}

