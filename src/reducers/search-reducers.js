import {
    ORDER_SEARCH,
    RESOURCE_SEARCH,
    SPECIFICATION_SEARCH
} from "../constants/search-constatants"

export const searchReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_SEARCH:
            return {searchOrder: action.payload}
        case RESOURCE_SEARCH:
            return {searchResource: action.payload}
        case SPECIFICATION_SEARCH:
            return {searchSpecification: action.payload}
        default:
            return state
    }
}