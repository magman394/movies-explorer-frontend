import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import promoBanner from '../../../images/promo-banner.svg';


function Promo(props) {
    return (
      <div className="promo">
      <Switch>
        <Route exact path='/main'>
        <div className="promo__header">
          <Link className="promo__logo" to='main'></Link>
          <nav className='promo__nav'>
            <Link className='promo__reg-link' to='signup'>Регистрация</Link>
            <Link className='promo__auth-link' to='signin'>Войти</Link>
          </nav>
        </div>
          <div className="promo__banner">
              <h1 className="promo__banner_title">Учебный проект студента факультета Веб-разработки.</h1>
              <img
                className='promo__banner_img'
                alt="Учебный проект студента факультета Веб-разработки."
                src={promoBanner}
              ></img>
          </div>
        </Route>
      </Switch>
      </div>
  );
}
export default Promo;