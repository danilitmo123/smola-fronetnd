import React, {useEffect, useState} from "react";
import {detailOrder} from "../../actions/order-detail-actions";
import {useDispatch, useSelector} from "react-redux";

export const OrderDetail = ({active, setActive, order_id}) => {

    const dispatch = useDispatch()
    dispatch.order_id = order_id
    const orderDetail = useSelector(state => state.orderDetail)
    const [orderO, setOrderO] = useState()
    const [specifications, setSpecification] = useState()
    const [resources, setResources] = useState()

    useEffect(() => {
        dispatch(detailOrder())
    }, [dispatch])

    const {error, loading, order} = orderDetail
    console.log("order")
    console.log(order)


    return (
        <div id={"order-detail"}>
            <div id={"order-detail-header"}>

            </div>
            <div id={"order-specifications"}>

            </div>
            <div id={"order-resources"}>


            </div>
        </div>
    )
}