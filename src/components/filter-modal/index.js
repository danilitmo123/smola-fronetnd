import React from 'react'

import './filter-modal.scss'


const FilterModal = ({active, setActive}) => {
    return (
        <div
            onClick={() => setActive(false)}
            className={active ? 'filter-modal active' : 'filter-modal'}>
            <div onClick={e => e.stopPropagation()} className={active ? 'modal-content active' : 'modal-content' }>
                <div className="filter-wrapper">
                    <div className="filter-title">СОРТИРОВАТЬ ПО:</div>
                    <div className="checkbox-wrapper">
                        <div className="id-checkbox">
                            <div className="title">ID</div>
                            <input type="checkbox"/>
                        </div>
                        <div className="id-checkbox">
                            <div className="title">Количество</div>
                            <input type="checkbox"/>
                        </div>
                        <div className="id-checkbox">
                            <div className="title">Название</div>
                            <input type="checkbox"/>
                        </div>
                        <div className="id-checkbox">
                            <div className="title">Due Date</div>
                            <input type="checkbox"/>
                        </div>
                        <div className="id-checkbox">
                            <div className="title">Last Login</div>
                            <input type="checkbox"/>
                        </div>
                    </div>
                    <div className="filter-title">USERS</div>
                    <div className="users-wrapper">
                        <div className="id-checkbox">
                            <div className="title">All</div>
                            <input type="checkbox"/>
                        </div>
                        <div className="id-checkbox">
                            <div className="title">Active</div>
                            <input type="checkbox"/>
                        </div>
                        <div className="id-checkbox">
                            <div className="title">Inactive</div>
                            <input type="checkbox"/>
                        </div>
                    </div>
                </div>
                <button className={'filter-btn'} onClick={() => setActive(false)}>Применить</button>
            </div>
        </div>
    )
}

export default FilterModal