import { useLocation, useHistory, Link } from 'react-router-dom';
import closIcon from '../../images/close.svg';
import accountIcon from '../../images/account.svg';
function Navigation(props) {
  const location = useLocation();
  const history = useHistory();
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
          <nav className='navigation__links' onClick={props.onClose}>
            <button type="button" className='navigation__link' onClick={() => {history.push("/main")}}>Главная</button>
            <button type="button" onClick={() => {history.push("/movies")}} className={(location.pathname === "/movies") ? 'header__link header__link_active' : 'header__link'} >Фильмы</button>
            <button type="button" onClick={() => {history.push("/saved-movies")}} className={(location.pathname === "/saved-movies") ? 'header__link header__link_active' : 'header__link'} >Сохранённые фильмы</button>
          </nav>

          <div className='navigation__account' onClick={props.onClose}>
            <img
              className='navigation__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <button className="navigation__bottton" type="button" onClick={() => {history.push("/profile")}}>
            Аккаунт
            </button>
          </div>
        </div>
        
      );
}
export default Navigation;