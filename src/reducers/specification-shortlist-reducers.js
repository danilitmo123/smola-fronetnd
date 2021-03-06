import {
    SPECIFICATION_SHORTLIST_FAIL,
    SPECIFICATION_SHORTLIST_SUCCESS,
    SPECIFICATION_SHORTLIST_REQUEST
} from "../constants/specification-shortlist-constants";

export const specificationShortListReducers = (state = {resourceShortList: {}}, action) => {
    switch (action.type) {
        case SPECIFICATION_SHORTLIST_REQUEST:
            return {loading: true, specificationsShortList: {}}
        case SPECIFICATION_SHORTLIST_SUCCESS:
            return {loading: false, specificationsShortList: {...action.payload}}
        case SPECIFICATION_SHORTLIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}