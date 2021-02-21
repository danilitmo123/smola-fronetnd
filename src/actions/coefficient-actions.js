import {
    COEFFICIENT_FAIL,
    COEFFICIENT_SUCCESS,
    COEFFICIENT_REQUEST
} from '../constants/coefficient-constants'
import axiosAPI from "../components/api/axiosApi";

export const changeCoefficientAction = (id, coefficient) => async (dispatch) => {
    try {
        dispatch({type: COEFFICIENT_REQUEST})



        const { data } = await axiosAPI.post('specification/set-coefficient/',
            {'id': id, 'coefficient': coefficient}
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