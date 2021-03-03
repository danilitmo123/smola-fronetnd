import {
    SPECIFICATION_LIST_FAIL,
    SPECIFICATION_LIST_REQUEST,
    SPECIFICATION_LIST_SUCCESS
} from "../constants/specification-constans";
import axiosAPI from "../components/api/axiosApi";
import store from "../store";

async function get() {
    let paramString = '/?'
    console.log(store.getState().searching)
    if (store.getState().searching && store.getState().searching.searchSpecification) {
        paramString += 'search=' + store.getState().searching.searchSpecification + '&'
    }
    if (store.getState().filtering && store.getState().filtering.filterSpecification) {
        for (let name in store.getState().filtering.filterSpecification) {
            paramString += name + '=' + store.getState().filtering.filterSpecification[name] + '&'
        }
    }


    return await axiosAPI.get('specification/list' + paramString)

}

export const listSpecifications = () => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_LIST_REQUEST})

        const {data} = await get()
        dispatch({
            type: SPECIFICATION_LIST_SUCCESS,
            payload: data.results
        })
    } catch (error) {
        dispatch({
            type: SPECIFICATION_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}