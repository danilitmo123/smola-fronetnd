import {
    SWITCH_SPECIFICATION_PAGE,
    SWITCH_RESOURCE_PAGE,
    SWITCH_PROFILE_PAGE,
    SWITCH_ORDER_PAGE,
    SWITCH_MAIN_PAGE
} from '../constants/switch-page-constants'

export const switchSpecificationPageAction = () => async (dispatch) => {
    dispatch({type: SWITCH_SPECIFICATION_PAGE})
}
export const switchResourcePageAction = () => async (dispatch) => {
    dispatch({type: SWITCH_RESOURCE_PAGE})
}
export const switchOrderPageAction = () => async (dispatch) => {
    dispatch({type: SWITCH_ORDER_PAGE})
}
export const switchMainPageAction = () => async (dispatch) => {
    dispatch({type: SWITCH_MAIN_PAGE})
}
export const switchProfileAction = () => async (dispatch) => {
    dispatch({type: SWITCH_PROFILE_PAGE})
}
