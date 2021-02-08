import {
    SPECIFICATION_CREATE_REQUEST,
    SPECIFICATION_CREATE_SUCCESS,
    SPECIFICATION_CREATE_FAIL
} from '../constants/specification-create-constants'

export const createSpecificationReducers = (state = {}, action) => {
    switch (action.type) {
        case SPECIFICATION_CREATE_REQUEST:
            return {loading: true}
        case SPECIFICATION_CREATE_SUCCESS:
            return {loading: false, createSpecificationInfo: action.payload}
        case SPECIFICATION_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}