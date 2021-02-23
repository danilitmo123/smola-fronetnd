import {
    PROFILE_REQUEST,
    PROFILE_FAIL,
    PROFILE_SUCCESS
} from "../constants/profile-constatnts";


export const profileReducers = (state = {profile: {}}, action) => {
    switch (action.type) {
        case PROFILE_REQUEST:
            return { loading: true, profile: {}}
        case PROFILE_SUCCESS:
            return { loading: false, profile: {...action.payload}}
        case PROFILE_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}