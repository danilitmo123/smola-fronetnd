import {
    SWITCH_SPECIFICATION_PAGE,
    SWITCH_RESOURCE_PAGE,
    SWITCH_ORDER_PAGE,
    SWITCH_MAIN_PAGE
} from "../constants/switch-page-constants";

export const switchPageReducers = (state = {}, action) => {
    switch (action.type) {
        case SWITCH_SPECIFICATION_PAGE:
            return {specificationPage: true, resourcePage: false, orderPage: false, mainPage: false}
        case SWITCH_RESOURCE_PAGE:
            return {specificationPage: false, resourcePage: true, orderPage: false, mainPage: false}
        case SWITCH_ORDER_PAGE:
            return {specificationPage: false, resourcePage: false, orderPage: true, mainPage: false}
        case SWITCH_MAIN_PAGE:
            return {specificationPage: false, resourcePage: false, orderPage: false, mainPage: true}
        default:
            return state
    }
}