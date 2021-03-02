import React from "react";
import {Link} from "react-router-dom";
import './network-error-page.scss'

const NetworkErrorPage = () => {
  return(
      <div className={'server-error-wrapper'}>
        <div className={'server-error-title'}>Ошибка сети</div>
        <Link to={'/'}>
          <button className={'back-to-main'}>Вернуться на главную</button>
        </Link>
      </div>
  )
}

export default NetworkErrorPage