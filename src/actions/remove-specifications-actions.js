import {
    REMOVE_SPECIFICATION_FAIL,
    REMOVE_SPECIFICATION_SUCCESS,
    REMOVE_SPECIFICATION_REQUEST
} from "../constants/remove-specification-constants";
import axios from "axios";

export const removeSpecAction = (id) => async (dispatch) => {
  try {
    dispatch({type: REMOVE_SPECIFICATION_REQUEST})

    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const {data} = await axios.post(
        'https://api-smola-20.herokuapp.com/specification/delete/',
        {'ids': [id]},
        config
    )

    dispatch({
      type: REMOVE_SPECIFICATION_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: REMOVE_SPECIFICATION_FAIL,
      payload: error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message
    })
  }
}