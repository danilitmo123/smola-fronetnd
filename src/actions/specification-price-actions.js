import axios from "axios";
import {
    SPECIFICATION_PRICE_FAIL,
    SPECIFICATION_PRICE_REQUEST,
    SPECIFICATION_PRICE_SUCCESS
} from '../constants/specification-price-constants'
import axiosAPI from "../components/api/axiosApi";

export const changeSpecPriceAction = (id, price) => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_PRICE_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axiosAPI.post(
            'specification/set-price/',
            {'id': id, 'price': price},
            config
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