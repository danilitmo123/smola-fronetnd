import React, {useEffect, useState} from "react";
import photo from '../../images/spec-card-img.png'
import './specification-card.scss'
import CardItem from "../specification-card-item/card-item";
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";

const SpecificationCard = ({active, specification}) => {

  const [currentCardData, setCurrentCardData] = useState(null)

  useEffect(() => {
    if (specification){
      axiosAPI.get('specification/' + specification.id).then((response => {
        console.log(response)
        setCurrentCardData(response.data)
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
              <div className="about-store on-store">Собранных на складе <span>{currentCardData ? currentCardData.amount : null}</span> шт</div>
              <div className="about-store on-collected">Можно собрать из имеющихся ресурсов <span>{currentCardData ? currentCardData.available_to_assemble : null}</span> шт</div>
            </div>
          </div>
          <div className="info-resource-title-wrapper">
            <div className="info-resource-title">Ресурсы</div>
          </div>
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
          {/*<button className={'card-btn'}>Изменить</button>*/}
        </div>
      </div>
  )
}

export default SpecificationCard