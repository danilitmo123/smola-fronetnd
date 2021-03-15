import React from 'react'
import loader from '../../images/loader.svg'

import './spinner.scss'

const Loader = () => {
    return (
        <div className={'loader'}>
            <img src={loader} alt={'loader'} className={'loader-img'}/>
            <span className={'loader-text'}>Загрузка...</span>
        </div>
    )
}

export default Loader