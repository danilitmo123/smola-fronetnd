import {
    RESOURCE_CREATE_REQUEST,
    RESOURCE_CREATE_SUCCESS,
    RESOURCE_CREATE_FAIL
} from '../constants/resource-create-constants'

export const createResourceReducers = (state = {}, action) => {
    switch (action.type) {
        case RESOURCE_CREATE_REQUEST:
            return {loading: true}
        case RESOURCE_CREATE_SUCCESS:
            return {loading: false, createResourceInfo: action.payload}
        case RESOURCE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}