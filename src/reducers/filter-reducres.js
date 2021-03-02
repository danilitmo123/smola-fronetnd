import {
    ORDER_FILTER,
    RESOURCE_FILTER,
    SPECIFICATION_FILTER
} from "../constants/filter-constants"

export const filterReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_FILTER:
            return {filterOrder: action.payload}
        case RESOURCE_FILTER:
            return {filterResource: action.payload}
        case SPECIFICATION_FILTER:
            return {filterSpecification: action.payload}
        default:
            return state
    }
}