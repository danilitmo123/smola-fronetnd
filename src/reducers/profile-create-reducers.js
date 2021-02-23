import {
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL
} from '../constants/profile-create-constants'

export const profileCreateReducers = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_CREATE_REQUEST:
            return {loading: true}
        case PROFILE_CREATE_SUCCESS:
            return {loading: false, createProfileInfo: action.payload}
        case PROFILE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}