import { useLocation, Link } from 'react-router-dom';
import closIcon from '../../images/close.svg';
import accountIcon from '../../images/account.svg';
function Navigation(props) {
  const location = useLocation();
    return (
        <div
          className={`navigation${props.isOpen ? " navigation_is-opened" : ""}`}
        >

            <img
              onClick={props.onClose}
              className='navigation__close'
              alt="Закрыть"
              src={closIcon}
            ></img>
          <nav className='navigation__links'>
            <Link className='navigation__link' to='/'>Главная</Link>
            <Link onClick={props.onClose} className={(location.pathname === "/movies") ? 'header__link header__link_active' : 'header__link'} to='saved-movies'>Фильмы</Link>
            <Link onClick={props.onClose} className={(location.pathname === "/saved-movies") ? 'header__link header__link_active' : 'header__link'} to='movies'>Сохранённые фильмы</Link>
          </nav>

          <div className='navigation__account'>
            <img
              className='navigation__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <button className="navigation__bottton" type="button" to='profile' onClick={props.onClose}>
            <Link className='header__link_profile' to='profile'>Аккаунт</Link>
            </button>
          </div>
        </div>
        
      );
}
export default Navigation;