import {
    SPECIFICATION_CREATE_REQUEST,
    SPECIFICATION_CREATE_SUCCESS,
    SPECIFICATION_CREATE_FAIL
} from '../constants/specification-create-constants'
import axiosAPI from "../components/api/axiosApi";

export const createSpecificationAction = (name, product_id, price, coefficient, category_name, resources, storage_amount) => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_CREATE_REQUEST})
        const {data} = await axiosAPI.post(
            'specification/create/',
            {
                'name': name,
                'product_id': product_id,
                'price': price,
                'coefficient': coefficient,
                'category_name': category_name,
                'resources_create': resources,
                'amount': storage_amount
            }
        )

        dispatch({
            type: SPECIFICATION_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SPECIFICATION_CREATE_FAIL,
            payload: error.response.data
        })
    }
}