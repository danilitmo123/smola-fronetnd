import React, {useEffect, useState} from "react";
import photo from '../../images/spec-card-img.png'
import './specification-card.scss'
import CardItem from "../specification-card-item/card-item";
import Loader from "../spinner";


import axios from "axios";
import axiosAPI from "../api/axiosApi";

const SpecificationCard = ({active, specification}) => {

  const [currentCardData, setCurrentCardData] = useState(null)

  const getCard = async (id) => {
    const { data } = await axiosAPI.get(`https://api-smola-20.herokuapp.com/specification/${id}/`)
    console.log(data)
    return data
  }

  useEffect(() => {
    if (specification){
      getCard(specification.id).then((newCard => {
        setCurrentCardData(newCard)
      }))
    }
  }, [specification])


  return (
      <div className="close-wrapper">
        <div
            onClick={e => e.stopPropagation()}
            className={active ? "specification-card-wrapper active" : "specification-card-wrapper"}>
          <div className="header-specification-card">
            <div className="specification-card-title">Розовый пляж</div>
          </div>
          <div className="specification-card-info">
            <img src={photo} alt="" className={'specification-card-img'}/>
            <div className="specification-card-store">
              <div className="about-store on-store">Собранных на складе <span>{5}</span>шт</div>
              <div className="about-store on-collected">Можно собрать из имеющихся ресурсов <span>35</span>шт</div>
            </div>
          </div>
          <div className="info-resource-title">Ресурсы</div>
          <div className="resource-info-block">
            <div className="resource-nav">
              <div className="nav-id">ID</div>
              <div className="nav-name">Название</div>
              <div className="resource-count">Количество</div>
            </div>
            <div>
              { currentCardData ?
                  <CardItem data={currentCardData}/>
                  : <Loader/>
              }
            </div>
          </div>
          <button className={'card-btn'}>Изменить</button>
        </div>
      </div>
  )
}

export default SpecificationCard