import axios from "axios";
import {
    PRICE_SUCCESS,
    PRICE_FAIL,
    PRICE_REQUEST
} from '../constants/price-constants'

export const changePriceAction = (id, price) => async (dispatch) => {
    try {
        dispatch({type: PRICE_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'https://api-smola-20.herokuapp.com/resource/set-cost/',
            {'id': id, 'cost': price},
            config
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