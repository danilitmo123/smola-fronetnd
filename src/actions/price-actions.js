import axios from "axios";
import {
    PRICE_SUCCESS,
    PRICE_FAIL,
    PRICE_REQUEST
} from '../constants/price-constants'
import axiosAPI from "../components/api/axiosApi";

export const changePriceAction = (id, price) => async (dispatch) => {
    try {
        dispatch({type: PRICE_REQUEST})

        const { data } = await axiosAPI.post('resource/set-cost/',
            {'id': id, 'cost': price},
        )

        dispatch({
            type: PRICE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRICE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}