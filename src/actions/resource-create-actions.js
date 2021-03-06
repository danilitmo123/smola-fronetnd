import {
    RESOURCE_CREATE_REQUEST,
    RESOURCE_CREATE_SUCCESS,
    RESOURCE_CREATE_FAIL
} from '../constants/resource-create-constants'
import axiosAPI from "../components/api/axiosApi";

export const createResourceAction = (name, external_id, provider_name, cost, amount, amount_limit) => async (dispatch) => {
    try {
        dispatch({type: RESOURCE_CREATE_REQUEST})


        console.log(name)
        const {data} = await axiosAPI.post('resource/create/',
            {
                'name': name,
                'external_id': external_id,
                'provider_name': provider_name,
                'cost': cost,
                'amount': amount,
                'amount_limit': amount_limit
            }
        )

        dispatch({
            type: RESOURCE_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: RESOURCE_CREATE_FAIL,
            payload: error.response.data
        })
    }
}