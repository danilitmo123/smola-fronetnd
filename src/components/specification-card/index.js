import React, {useEffect, useState} from "react";
import close from '../../images/Close.svg'
import photo from '../../images/spec-card-img.png'
import './specification-card.scss'
import {useDispatch, useSelector} from "react-redux";
import {getResourcesInSpecification} from "../../actions/resources-in-spec-actions";
import axios from "axios";


const SpecificationCard = ({active, specification}) => {
    const dispatch = useDispatch()
    const resourcesInSpecification = useSelector(state => state.resourcesInSpecification)
    // const {data} = resourcesInSpecification
    // const changeActive = () => {
    //     setActive(prev => !prev)
    // }

    // useEffect(() => {
    //     dispatch(getResourcesInSpecification(id))
    // }, [id])

    const [currentCardData, setCurrentCardData] = useState({})

    const getCard = async (id) => {
        const { data } = await axios.get(`https://api-smola-20.herokuapp.com/specification/${id}/`)
        return data
    }

    useEffect(() => {
        if (specification){
            getCard(specification.id).then((newCard => {
                setCurrentCardData(newCard)
                console.log(newCard)
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
                    <img src={close} alt="close" />
                </div>
                <div className="specification-card-info">
                    <img src={photo} alt="" className={'specification-card-img'}/>
                    <div className="specification-card-store">
                        <div className="about-store on-store">Собранных на складе <span>5</span>шт</div>
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
                          currentCardData.price
                          : ""
                        }
                    </div>
                </div>
                <button className={'card-btn'}>Изменить</button>
            </div>
        </div>
    )
}

export default SpecificationCard