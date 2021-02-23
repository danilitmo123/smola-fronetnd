import {
    SPECIFICATION_PRICE_FAIL,
    SPECIFICATION_PRICE_REQUEST,
    SPECIFICATION_PRICE_SUCCESS
} from '../constants/specification-price-constants'
import axiosAPI from "../components/api/axiosApi";

export const changeSpecPriceAction = (id, price) => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_PRICE_REQUEST})


        const { data } = await axiosAPI.post(
            'specification/set-price/',
            {'id': id, 'price': price},
        )

        dispatch({
            type: SPECIFICATION_PRICE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SPECIFICATION_PRICE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}