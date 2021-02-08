import {
    RESOURCE_SHORTLIST_REQUEST,
    RESOURCE_SHORTLIST_SUCCESS,
    RESOURCE_SHORTLIST_FAIL
} from "../constants/resource-shortlist";

export const resourcesShortListReducers = (state = {resources: {}}, action) => {
    switch (action.type) {
        case RESOURCE_SHORTLIST_REQUEST:
            return {loading: true, resources: {}}
        case RESOURCE_SHORTLIST_SUCCESS:
            return {loading: false, resources: {...action.payload}}
        case RESOURCE_SHORTLIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}