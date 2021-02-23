import {
    RESOURCE_UPLOAD_REQUEST,
    RESOURCE_UPLOAD_SUCCESS,
    RESOURCE_UPLOAD_FAIL
} from '../constants/resource-upload-constants'
import axiosAPI from "../components/api/axiosApi";

export const uploadResourcesAction = (file, direction) => async (dispatch) => {
    try {
        dispatch({type: RESOURCE_UPLOAD_REQUEST})

        const formData = new FormData();
        formData.append('file', file)
        formData.append('direction', direction)


        const {data} = await axiosAPI.post(
            "resource/upload/",
            formData,
        )

        dispatch({
            type: RESOURCE_UPLOAD_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RESOURCE_UPLOAD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}