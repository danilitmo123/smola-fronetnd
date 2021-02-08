import {
    RESOURCE_UPLOAD_REQUEST,
    RESOURCE_UPLOAD_SUCCESS,
    RESOURCE_UPLOAD_FAIL
} from "../constants/resource-upload-constants";

export const resourcesUploadReducers = (state = {data: {}}, action) => {
    switch (action.type) {
        case RESOURCE_UPLOAD_REQUEST:
            return {loading: true, data: {}}
        case RESOURCE_UPLOAD_SUCCESS:
            return {loading: false, data: {...action.payload}}
        case RESOURCE_UPLOAD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}