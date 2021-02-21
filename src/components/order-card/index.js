import React, {useEffect, useState} from "react";
import photo from '../../images/spec-card-img.png'
import './order-card.scss'
import CardItem from "../specification-card-item/card-item";


import axios from "axios";
import OrderCardProductsItem from "../order-card-pruducts-item";
import OrderCardResourcesItem from "../order-card-resources-item";

const OrderCard = ({active, order}) => {

  const [currentCardData, setCurrentCardData] = useState(null)

  const getCard = async (id) => {
    const { data } = await axios.get(`https://api-smola-20.herokuapp.com/order/${id}/`)
    return data
  }

  useEffect(() => {
    if (order){
      getCard(order.id).then((newCard => {
        setCurrentCardData(newCard)
      }))
    }
  }, [order])

  return (
      <div className="close-wrapper">
        <div
            onClick={e => e.stopPropagation()}
            className={active ? "specification-card-wrapper active" : "specification-card-wrapper"}>
          <div className="header-specification-card">
            <div className="specification-card-title">Товары</div>
          </div>
          <div className="nav-card-products">
            <div>ID</div>
            <div>Название</div>
            <div>Количество</div>
          </div>
          {
            currentCardData ? <OrderCardResourcesItem data={currentCardData}/> : ''
          }
          <div className="header-specification-card">
            <div className="specification-card-title">Ресурсы</div>
          </div>
          <div className="nav-card-products">
            <div>ID</div>
            <div>Название</div>
            <div>Количество</div>
          </div>
          {
            currentCardData ? <OrderCardProductsItem data={currentCardData}/> : ''
          }

          <button className={'card-btn'}>Собрать</button>
        </div>
      </div>
  )
}

export default OrderCard