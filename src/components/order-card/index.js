import React, {useEffect, useState} from "react";
import './order-card.scss'
import OrderCardProductsItem from "../order-card-pruducts-item";
import OrderCardResourcesItem from "../order-card-resources-item";
import axiosAPI from "../api/axiosApi";
import Loader from "../spinner";

const OrderCard = ({active, order}) => {

  const [currentCardData, setCurrentCardData] = useState(null)

  const getCard = async (id) => {
    const { data } = await axiosAPI.get(`https://api-smola-20.herokuapp.com/order/${id}/`)
    return data
  }

  useEffect(() => {
    if (order){
      getCard(order.id).then((newCard => {
        setCurrentCardData(newCard)
      }))
    }
  }, [order])
  console.log(currentCardData)

  return (
      <div className="close-wrapper">
        <div
            onClick={e => e.stopPropagation()}
            className={active ? "specification-card-wrapper active" : "specification-card-wrapper"}>
          {
            currentCardData ? currentCardData.order_specification.length ?
                <div>
                  <div className="header-specification-card">
                    <div className="specification-card-title">Товары</div>
                  </div>
                  <div className="nav-card-products">
                    <div className={'ID'}>ID</div>
                    <div className={'nav-card-name'}>Название</div>
                    <div className={'nav-card-count'}>Количество</div>
                  </div>
                  <div className={'order-card-resource-item'}>
                    {
                      currentCardData ? <OrderCardResourcesItem data={currentCardData}/> : ''
                    }
                  </div>
                  <div className="header-specification-card">
                    <div className="specification-card-title">Ресурсы</div>
                  </div>
                  <div className={'order-card-resource-item'}>
                    {
                      currentCardData ? <OrderCardProductsItem data={currentCardData}/> : ''
                    }
                  </div>
                </div> :
                <div className="no-order-wrapper">
                  <div className={'no-order'}>Пустой заказ</div>
                </div> : <Loader/>
          }
          {/*<button className={'card-btn'}>Собрать</button>*/}
        </div>
      </div>
  )
}

export default OrderCard