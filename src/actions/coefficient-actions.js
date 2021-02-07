import axios from "axios";
import {
    COEFFICIENT_FAIL,
    COEFFICIENT_SUCCESS,
    COEFFICIENT_REQUEST
} from '../constants/coefficient-constants'

export const changeCoefficientAction = (id, coefficient) => async (dispatch) => {
    try {
        dispatch({type: COEFFICIENT_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'https://api-smola-20.herokuapp.com/specification/set-coefficient/',
            {'id': id, 'coefficient': coefficient},
            config
        )

        dispatch({
            type: COEFFICIENT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: COEFFICIENT_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}