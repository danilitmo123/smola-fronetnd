import {createStore, combineReducers, applyMiddleware} from "redux";
import {productListReducers} from "./reducers/product-reducers";
import {specificationListReducers} from "./reducers/specification-reducers";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {priceReducers} from "./reducers/price-reducers";
import {specificationPriceReducers} from "./reducers/specification-price-reducer";
import {coefficientReducers} from "./reducers/coefficient-reducers";
import {createResourceReducers} from "./reducers/resource-create-reducers";
import {createSpecificationReducers} from "./reducers/specification-create-reducers"
import {resourcesShortListReducers} from "./reducers/resource-shortlist-reducers"
import {resourcesUploadReducers} from "./reducers/resource-upload-reducers"
import {orderListReducers} from "./reducers/order-list-reducers"
import {orderDetailReducer} from "./reducers/order-deatail-reducers";
import {resourcesInSpecificationReducers} from "./reducers/resources-in-spec-reducers";
import {removeItemReducers} from "./reducers/remove-resources-reducers";
import {removeSpecificationReducers} from "./reducers/remove-specifications-reducers";
import {createOrderReducers} from "./reducers/order-create-reducers"
import {specificationShortListReducers} from "./reducers/specification-shortlist-reducers"
import {authReducer} from "./reducers/auth"
import {profileReducers} from "./reducers/profile-reducers"
import {profileAdminListReducers} from "./reducers/profile-admin-list-reducers"
import {profileChangePasswordReducers} from "./reducers/profile-change-password"
import {profileCreateReducers} from "./reducers/profile-create-reducers"
import {switchPageReducers} from "./reducers/switch-page-reducers"
import {checkAuthReducers} from "./reducers/check-auth-reducers"
import {editProfileReducers} from "./reducers/profile-edit"
import {searchReducer} from "./reducers/search-reducers"

const reducer = combineReducers({
    productList: productListReducers,
    auth: authReducer,
    specificationList: specificationListReducers,
    changePrice: priceReducers,
    specChangePrice: specificationPriceReducers,
    changeCoefficient: coefficientReducers,
    createResource: createResourceReducers,
    createSpecification: createSpecificationReducers,
    resourcesShortlist: resourcesShortListReducers,
    uploadResource: resourcesUploadReducers,
    orderList: orderListReducers,
    orderDetail: orderDetailReducer,
    resourcesInSpecification: resourcesInSpecificationReducers,
    removeResource: removeItemReducers,
    removeSpecification: removeSpecificationReducers,
    createOrder: createOrderReducers,
    shortlistSpecification: specificationShortListReducers,
    profile: profileReducers,
    profileCreate: profileCreateReducers,
    profileAdminList: profileAdminListReducers,
    profileChangePassword: profileChangePasswordReducers,
    switchPage: switchPageReducers,
    checkAuth: checkAuthReducers,
    editProfile: editProfileReducers,
    searching: searchReducer
})

const initialState = {switchPage: {mainPage: true}}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store