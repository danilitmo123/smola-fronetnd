import {
    SPECIFICATION_CREATE_REQUEST,
    SPECIFICATION_CREATE_SUCCESS,
    SPECIFICATION_CREATE_FAIL
} from '../constants/specification-create-constants'
import axiosAPI from "../components/api/axiosApi";

export const createResourceAction = (name, product_id, price, coefficient, category_name, resources, storage_amount) => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_CREATE_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axiosAPI.post(
            'specification/create/',
            {
                'name': name,
                'product_id': product_id,
                'price': price,
                'coefficient': coefficient,
                'category_name': category_name,
                'resources_create': resources,
                'storage_amount': storage_amount
            },
            config
        )

        dispatch({
            type: SPECIFICATION_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: SPECIFICATION_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}