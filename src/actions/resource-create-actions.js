import {
    RESOURCE_CREATE_REQUEST,
    RESOURCE_CREATE_SUCCESS,
    RESOURCE_CREATE_FAIL
} from '../constants/resource-create-constants'
import axiosAPI from "../components/api/axiosApi";

export const createResourceAction = (name, external_id, provider_name, cost, amount) => async (dispatch) => {
    try {
        dispatch({type: RESOURCE_CREATE_REQUEST})


        console.log(name)
        const {data} = await axiosAPI.post('resource/create/',
            {
                'name': name,
                'external_id': external_id,
                'provider_name': provider_name,
                'cost': cost,
                'amount': amount
            }
        )

        dispatch({
            type: RESOURCE_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RESOURCE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}