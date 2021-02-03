import { createStore, combineReducers, applyMiddleware} from "redux";
import {productListReducers} from "./reducers/product-reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
    productList: productListReducers
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store