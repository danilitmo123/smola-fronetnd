import React, {useEffect, useState} from "react";
import photo from '../../images/spec-card-img.png'
import './order-card.scss'
import CardItem from "../card-item/card-item";


import axios from "axios";

const OrderCard = ({active, order}) => {

  const [currentCardData, setCurrentCardData] = useState(null)

  const getCard = async (id) => {
    const { data } = await axios.get(`https://api-smola-20.herokuapp.com/order/assemble-info/${id}/`)
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
          <div className="header-specification-card">
            <div className="specification-card-title">Ресурсы</div>
          </div>

          <button className={'card-btn'}>Собрать</button>
        </div>
      </div>
  )
}

export default OrderCard