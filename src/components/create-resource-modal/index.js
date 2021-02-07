import React from 'react'

import './create-resource-modal.scss'


const CreateResourceModal = ({active, setActive}) => {
    return (
        <div
            onClick={() => setActive(false)}
            className={active ? 'resource-modal active' : 'resource-modal'}>
            <form onClick={e => e.stopPropagation()} className={active ? 'create-modal-content active' : 'create-modal-content' }>
                <div className="resource-modal-title">Создать ресурс</div>
                <div className="create-resource-wrapper">

                </div>
                <button className={'filter-btn'} onClick={() => setActive(false)}>Применить</button>
            </form>
        </div>
    )
}

export default CreateResourceModal