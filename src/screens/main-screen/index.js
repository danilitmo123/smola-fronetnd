import React from "react";

import './main-screen.scss'

const MainScreen = () => {
  return(
      <div className={'main-screen-wrapper'}>
        <div className="main-screen-card">
          <div className="card-title">9</div>
          <div className="card-info">Количество закончившихся товаров</div>
        </div>
        <div className="main-screen-card">
          <div className={'title-wrapper'}>
            <div className="card-title green">15</div>
            <div className="card-title yellow">20</div>
            <div className="card-title red">3</div>
          </div>
          <div className="card-info">Количество заказов</div>
        </div>
        <div className="main-screen-card">
          <div className="card-title">20</div>
          <div className="card-info">Цены которые нужно подтвердить</div>
        </div>
      </div>
  )
}

export default MainScreen