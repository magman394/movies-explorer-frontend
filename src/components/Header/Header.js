import React from "react";
import { Link, useLocation } from 'react-router-dom';
import accountIcon from '../../images/account.svg';
import menuIcon from '../../images/menu-icon.svg';
function Header(props) {
  const location = useLocation();
    return (


        <header className="header">
        <Link className="header__logo" to='/main'></Link>
          <nav className='header__nav'>
            <Link className={(location.pathname === "/movies") ? 'header__link header__link_active' : 'header__link'} to='movies'>Фильмы</Link>
            <Link className={(location.pathname === "/saved-movies") ? 'header__link header__link_active' : 'header__link'} to='saved-movies'>Сохранённые фильмы</Link>
          </nav>
          <div className='header__account'>
            <img
              className='header__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <button className='header__botton' type="button" onClick={props.Profile}>
            <Link className='header__link_profile' to='profile'>Аккаунт</Link>
            </button>
          </div>
          <menu className='header__menu'>
                <button className='header__botton' type="button" onClick={props.onMenu}>
                    <img
                    className='header__menu_icon'
                    alt="Меню"
                    src={menuIcon}
                    ></img>
                </button>
          </menu>
          </header>


  );
}
export default Header;