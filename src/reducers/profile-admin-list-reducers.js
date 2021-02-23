import {
    PROFILE_ADMIN_LIST_REQUEST,
    PROFILE_ADMIN_LIST_SUCCESS,
    PROFILE_ADMIN_LIST_FAIL,

} from '../constants/profile-adimin-list-constatns'

export const profileAdminListReducers = (state = {profileAdminList: {}}, action) => {
    switch (action.type) {
        case PROFILE_ADMIN_LIST_REQUEST:
            return {loading: true, profileAdminList: {}}
        case PROFILE_ADMIN_LIST_SUCCESS:
            return {loading: false, profileAdminList: {...action.payload}}
        case PROFILE_ADMIN_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}