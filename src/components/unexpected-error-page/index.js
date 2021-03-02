import React from "react";
import {Link} from "react-router-dom";

import './unexpected-error-page.scss'

const UnexpectedErrorPage = () => {
  return(
      <div className={'server-error-wrapper'}>
        <div className={'server-error-title'}>Неизвестная ошибка</div>
        <Link to={'/'}>
          <button className={'back-to-main'}>Вернуться на главную</button>
        </Link>
      </div>
  )
}

export default UnexpectedErrorPage