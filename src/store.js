import { createStore, combineReducers, applyMiddleware} from "redux";
import {productListReducers} from "./reducers/product-reducers";
import {specificationListReducers} from "./reducers/specification-reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {priceReducers} from "./reducers/price-reducers";
import {specificationPriceReducers} from "./reducers/specification-price-reducer";
import {coefficientReducers} from "./reducers/coefficient-reducers";

const reducer = combineReducers({
    productList: productListReducers,
    specificationList: specificationListReducers,
    changePrice: priceReducers,
    specChangePrice: specificationPriceReducers,
    changeCoefficient: coefficientReducers
})

const initialState = {}

const middleware = [thunk]

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store