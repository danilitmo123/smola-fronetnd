import React from 'react'
import loader from '../../images/loader.svg'

import './spinner.scss'

const Loader = () => {
    console.log("LOADER render. "  + new Date())
    return (
        <div className={'loader'}>
            <img src={loader} alt={'loader'} className={'loader-img'}/>
            <span className={'loader-text'}>Загрузка...</span>
        </div>
    )
}

export default Loader