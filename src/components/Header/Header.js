import React from "react";
import { Link } from 'react-router-dom';
import accountIcon from '../../images/account.svg';
import menuIcon from '../../images/menu-icon.svg';
function Header(props) {

    return (


        <header className="header">
        <Link className="header__logo" to='/main'></Link>
          <nav className='header__nav'>
            <Link className='header__link header__link_active' to='movies'>Фильмы</Link>
            <Link className='header__link' to='saved-movies'>Сохранённые фильмы</Link>
          </nav>
          <div className='header__account'>
            <img
              className='header__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <botton to='profile' onClick={props.Relogin}>
              Аккаунт
            </botton>
          </div>
          <menu className='header__menu'>
                <botton onClick={props.onMenu}>
                    <img
                    className='header__menu_icon'
                    alt="Меню"
                    src={menuIcon}
                    ></img>
                </botton>
          </menu>
          </header>


  );
}
export default Header;