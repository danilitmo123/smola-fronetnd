import {
    PROFILE_CHANGE_PASSWORD_REQUEST,
    PROFILE_CHANGE_PASSWORD_SUCCESS,
    PROFILE_CHANGE_PASSWORD_FAIL
} from '../constants/profile-change-password'

export const profileChangePasswordReducers = (state = {}, action) => {
    switch (action.type) {
        case PROFILE_CHANGE_PASSWORD_REQUEST:
            return {loading: true}
        case PROFILE_CHANGE_PASSWORD_SUCCESS:
            return {loading: false, changePasswordInfo: action.payload}
        case PROFILE_CHANGE_PASSWORD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}