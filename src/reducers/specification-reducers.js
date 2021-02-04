import {
    SPECIFICATION_LIST_FAIL,
    SPECIFICATION_LIST_REQUEST,
    SPECIFICATION_LIST_SUCCESS
} from "../constants/specification-constans";

export const specificationListReducers = (state = {specification: []}, action) => {
    switch (action.type) {
        case SPECIFICATION_LIST_REQUEST:
            return {loading: true, specification: []}
        case SPECIFICATION_LIST_SUCCESS:
            return {loading: false, specification: action.payload}
        case SPECIFICATION_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}