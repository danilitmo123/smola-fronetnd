import {
    RESOURCES_IN_SPECIFICATION_FAIL,
    RESOURCES_IN_SPECIFICATION_REQUEST,
    RESOURCES_IN_SPECIFICATION_SUCCESS
} from "../constants/resources-in-spec-constants";

export const resourcesInSpecificationReducers = (state = {data: {}}, action) => {
    switch (action.type) {
        case RESOURCES_IN_SPECIFICATION_REQUEST:
            return {loading: true, data: {}}
        case RESOURCES_IN_SPECIFICATION_SUCCESS:
            return {loading: false, data: {...action.payload}}
        case RESOURCES_IN_SPECIFICATION_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}