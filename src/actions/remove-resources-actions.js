import {
  REMOVE_RESOURCE_FAIL,
  REMOVE_RESOURCE_REQUEST,
  REMOVE_RESOURCE_SUCCESS
} from "../constants/remove-resource-constants";
import axios from "axios";
import axiosAPI from "../components/api/axiosApi";

export const removeAction = (id) => async (dispatch) => {
  try {
    dispatch({type: REMOVE_RESOURCE_REQUEST})

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const {data} = await axiosAPI.post('resource/delete/',
        {'ids': [id]},
        config
    )

    dispatch({
      type: REMOVE_RESOURCE_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: REMOVE_RESOURCE_FAIL,
      payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    })
  }
}