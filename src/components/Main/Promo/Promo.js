import React from "react";
import { Route, Switch, Link } from 'react-router-dom';
import promoBanner from '../../../images/promo-banner.svg';
import accountIcon from '../../../images/account.svg';
import menuIcon from '../../../images/menu-icon.svg';
function Promo(props) {
    return (
      <div className="promo">
      <Switch>
      <Route exact path='/'>
        { localStorage.getItem('login') ? 
        <div className="promo__login-header">
        <div className="promo__header">
          <Link className="promo__logo" to=''></Link>
          <nav className='promo__nav'>
            <Link className='promo__reg-link' to='movies'>Фильмы</Link>
            <Link className='promo__reg-link' to='saved-movies'>Сохраненные фильмы</Link>
          </nav>
          <div className='promo__account'>
            <img
              className='promo__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <Link className='promo__link_profile' to='profile'>Аккаунт</Link>
          </div>
        </div>
        <div className="promo__login-header_menu">
        <Link className="promo__logo" to=''></Link>
        <menu className='promo__menu'>
                <button className='promo__button' type="button" onClick={props.onMenu}>
                    <img
                    className='header__menu_icon'
                    alt="Меню"
                    src={menuIcon}
                    ></img>
                </button>
          </menu>
          </div>
        </div>
        : <div className="promo__header">
          <Link className="promo__logo" to=''></Link>
          <nav className='promo__nav'>
            <Link className='promo__reg-link' to='signup'>Регистрация</Link>
            <Link className='promo__auth-link' to='signin'>Войти</Link>
          </nav>
        </div> }

        
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