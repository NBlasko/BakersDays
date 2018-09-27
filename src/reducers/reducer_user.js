import { SIGNED_IN, DELETE_ALL } from '../constants';

let initialUser = {
    email: null
}

export default (state = initialUser, action) => {
    switch (action.type) {

        case SIGNED_IN:
            const { email } = action;
             return { email };
        case DELETE_ALL:
            return initialUser;
        default:
            return state;
    }
}