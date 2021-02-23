import {
    CHECK_AUTHORIZATION_REQUEST,
    CHECK_AUTHORIZATION_SUCCESS,
    CHECK_AUTHORIZATION_FAIL,
    CHECK_AUTHORIZATION_NEEDLESS
} from "../constants/check-authorization-constants";

export const checkAuthReducers = (state = {data: {}}, action) => {
    switch (action.type) {
        case CHECK_AUTHORIZATION_REQUEST:
            return {loading: true, data: {}}
        case CHECK_AUTHORIZATION_NEEDLESS:
            return {loading: false, data: {}}
        case CHECK_AUTHORIZATION_SUCCESS:
            return {loading: false, data: {...action.payload}}
        case CHECK_AUTHORIZATION_FAIL:
            return {loading: false, data: action.payload}
        default:
            return state
    }
}