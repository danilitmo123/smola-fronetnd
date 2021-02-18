import {
    REMOVE_RESOURCE_FAIL,
    REMOVE_RESOURCE_REQUEST,
    REMOVE_RESOURCE_SUCCESS
} from "../constants/remove-resource-constants";

export const removeItemReducers = (state = {}, action) => {
    switch (action.type) {
        case REMOVE_RESOURCE_REQUEST:
            return {loading: true, data: {}}
        case REMOVE_RESOURCE_SUCCESS:
            return {loading: false, data: action.payload}
        case REMOVE_RESOURCE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}