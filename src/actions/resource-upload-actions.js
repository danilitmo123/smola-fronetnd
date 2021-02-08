import axios from "axios";
import {
    RESOURCE_UPLOAD_REQUEST,
    RESOURCE_UPLOAD_SUCCESS,
    RESOURCE_UPLOAD_FAIL
} from '../constants/resource-upload-constants'

export const uploadResourcesAction = (file, direction) => async (dispatch) => {
    try {
        dispatch({type: RESOURCE_UPLOAD_REQUEST})

        const formData = new FormData();
        formData.append('file', file)
        formData.append('direction', direction)

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const {data} = await axios.post(
            "https://api-smola-20.herokuapp.com/resource/upload/",
            formData,
            config
        )

        dispatch({
            type: RESOURCE_UPLOAD_SUCCESS,
            payload: data
        })


    } catch (error) {
        console.log(error.response)
        dispatch({
            type: RESOURCE_UPLOAD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}