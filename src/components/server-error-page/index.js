import React from "react";
import {Link} from "react-router-dom";
import './server-error-page.scss'

const ServerErrorPage = () => {
  return(
      <div className={'server-error-wrapper'}>
        <div className={'server-error-title'}>Ошибка сервера</div>
        <Link to={'/'}>
          <button className={'back-to-main'}>Вернуться на главную</button>
        </Link>
      </div>
  )
}

export default ServerErrorPage