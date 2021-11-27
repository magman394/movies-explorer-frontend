import React from "react";
import { useLocation, useHistory } from 'react-router-dom';
import accountIcon from '../../images/account.svg';
import menuIcon from '../../images/menu-icon.svg';
function Header(props) {
  const location = useLocation();
  const history = useHistory();
    return (


        <header className="header">
         <button type="button" className="header__logo" onClick={() => {history.push("/main")}}></button>
          <nav className='header__nav'>
            <button type="button" className={(location.pathname === "/movies") ? 'header__link header__link_active' : 'header__link'} onClick={() => {history.push("/movies")}}>Фильмы</button>
            <button type="button" className={(location.pathname === "/saved-movies") ? 'header__link header__link_active' : 'header__link'} onClick={() => {history.push("/saved-movies")}}>Сохранённые фильмы</button>
          </nav>
          <div className='header__account'>
            <img
              className='header__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <button type="button" className='header__link_profile' onClick={() => {history.push("/profile")}}>Аккаунт</button>
          </div>
          <menu className='header__menu'>
                <button className='header__button' type="button" onClick={props.onMenu}>
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