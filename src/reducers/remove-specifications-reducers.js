import {
  REMOVE_SPECIFICATION_FAIL,
  REMOVE_SPECIFICATION_REQUEST,
  REMOVE_SPECIFICATION_SUCCESS
} from '../constants/remove-specification-constants'


export const removeSpecificationReducers = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_SPECIFICATION_REQUEST:
      return {loading: true, data: {}}
    case REMOVE_SPECIFICATION_SUCCESS:
      return {loading: false, data: action.payload}
    case REMOVE_SPECIFICATION_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state
  }
}