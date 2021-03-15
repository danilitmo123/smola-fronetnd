import React, {useEffect, useState} from "react";
import './specification-card.scss'
import CardItem from "../specification-card-item/card-item";
import Loader from "../spinner";
import axiosAPI from "../api/axiosApi";
import {useDispatch} from "react-redux";
import close from '../../images/cancel.svg'
import {listProducts} from "../../actions/product-actions";
import AmountSpecificationModal from "../amount-specification-modal";

const SpecificationCard = ({onClose, active, specification}) => {

  const dispatch = useDispatch()

  const [currentCardData, setCurrentCardData] = useState(null)
  const [amount, setAmount] = useState(0)
  const [resourceAmountResponseData, setResourceAmountResponseData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeModal, setActiveModal] = useState(false)

  useEffect(() => {
    if (specification){
      axiosAPI.get('specification/' + specification.id).then((response => {
        setCurrentCardData(response.data)
      }))
    }
  }, [specification])



  const reloadData = () => {
    setAmount(0.0)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    setLoading(true)
    axiosAPI.post('specification/manage-build/',
        {
          'id': specification.id,
          'amount': amount,
        }
    )
        .then(response => {
          reloadData()
          setResourceAmountResponseData(response.data)
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          setError(error.response.data)
        })
  }

  return (
      <div className="close-wrapper">
        <div
            onClick={e => e.stopPropagation()}
            className={active ? "specification-card-wrapper active" : "specification-card-wrapper"}>
          <div className="header-specification-card">
            <div className="specification-card-title">{specification ? specification.name : ''}</div>
            <div className={'id-in-card'}>ID: {specification ? specification.product_id : ''}</div>
            <div className="specification-card-title">
              <img onClick={onClose} src={close} className={'close-card-btn'}/>
            </div>
          </div>
          <div className="specification-card-info">
            <div className="specification-card-store">
              <div className="about-store on-store">Собранных на складе: <span>{currentCardData ? currentCardData.amount : null}</span> шт</div>
              <div className="about-store on-collected">Можно собрать из имеющихся ресурсов: <span>{currentCardData ? currentCardData.available_to_assemble : null}</span> шт</div>
              <div className="about-store ">
                <div>Себестоимость:</div>
                <div>{specification ? specification.prime_cost ?
                    parseFloat(specification.prime_cost)
                    : 'нет' : 'нет'}</div>
              </div>
              <div className="about-store">
                <div>Маржа:</div>
                <div>{specification ? specification.price ?
                      ((parseFloat(specification.price) - parseFloat(specification.prime_cost)) / parseFloat(specification.price))
                          .toFixed(2) : 'нет' : 'нет'}
                </div>
              </div>
              <div className="about-store">
                <div>Коэффициент:</div>
                <div>{specification ? specification.coefficient ? parseFloat(specification.coefficient).toFixed(2) : 'нет' : 'нет'}</div>
              </div>
              <div className="about-store">
                <div>Рекомендуемая цена:</div>
                <div>{specification ? specification.coefficient ? parseFloat(specification.coefficient * specification.prime_cost)
                  .toFixed(1) : 'нет' : 'нет'}
                </div>
              </div>
              <div className="about-store">
                <div>Текущая цена:</div>
                <div>{specification ? specification.price ? parseInt(specification.price) : 'нет' : 'нет'}</div>
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
              <div className="about-store">
                <form onSubmit={submitHandler} className={'about-store'}>
                  <input type="number" name="amount" id="amount"
                         className={'create-order-input'}
                         onChange={e => setAmount(e.target.value)}
                         value={amount}/>
                  <button className={'calculate-btn'} type={'submit'}>Расчет</button>
                </form>
                <div className={'about-store'}>
                  <button className={'calculate-btn'} onClick={() => setActiveModal(true)}>Собрать</button>
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
                  <CardItem data={currentCardData} responseData={resourceAmountResponseData}/>
                  : <Loader/>
              }
            </div>
          </div>
        </div>
        <AmountSpecificationModal active={activeModal} setActive={setActiveModal} id={specification.id}/>
      </div>
  )
}

export default SpecificationCard