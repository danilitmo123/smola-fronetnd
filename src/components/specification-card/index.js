import React, {useEffect, useState} from "react";
import photo from '../../images/spec-card-img.png'
import './specification-card.scss'
import CardItem from "../specification-card-item/card-item";
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";

const SpecificationCard = ({active, specification}) => {

  const [currentCardData, setCurrentCardData] = useState(null)
  const [activeCard, setActiveCard] = useState(false)

  useEffect(() => {
    if (specification){
      axiosAPI.get('specification/' + specification.id).then((response => {
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
            <div className="specification-card-title">{specification ? specification.name : ''}</div>
            {/*<button className={active ? "specification-card-wrapper active" : "specification-card-wrapper"}>x</button>*/}
          </div>
          <div className="specification-card-info">
            <div className="specification-card-store">
              <div className="about-store on-store">Собранных на складе: <span>{currentCardData ? currentCardData.amount : null}</span> шт</div>
              <div className="about-store on-collected">Можно собрать из имеющихся ресурсов: <span>{currentCardData ? currentCardData.available_to_assemble : null}</span> шт</div>
              <div className="about-store ">
                <div>Себестоимость:</div>
                <div>{specification ?
                    parseFloat(specification.prime_cost)
                    : 'нет'}</div>
              </div>
              <div className="about-store">
                <div>Маржа:</div>
                <div>{specification ?
                      ((parseFloat(specification.price) - parseFloat(specification.prime_cost)) / parseFloat(specification.price))
                          .toFixed(2) : 'нет'}
                </div>
              </div>
              <div className="about-store">
                <div>Коэффициент:</div>
                <div>{specification ? parseFloat(specification.coefficient).toFixed(2) : 'нет'}</div>
              </div>
              <div className="about-store">
                <div>Рекомендуемая цена:</div>
                <div>{specification ? parseFloat(specification.coefficient * specification.prime_cost)
                  .toFixed(1) : 'нет'}
                </div>
              </div>
              <div className="about-store">
                <div>Текущая цена:</div>
                <div>{specification ? parseInt(specification.price) : 'нет'}</div>
              </div>
              <div className="about-store">
                <div>Категория:</div>
                <div> {specification ? specification.category ? specification.category.name : 'нет' : 'нет'}</div>
              </div>
              <div className="about-store">
                <div>N/X:</div>
                <div>{specification ? specification.amount_accuracy ? specification.amount_accuracy : 'нет' : 'нет'}
                </div>
              </div>
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
            <div className={'scroll-div'}>
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