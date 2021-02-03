import React from 'react'
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <Spinner animation={'border'} role={'status'} className={'spinner'}>
            <span>Загрузка...</span>
        </Spinner>
    )
}

export default Loader