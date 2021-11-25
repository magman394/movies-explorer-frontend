import { Route, Link } from 'react-router-dom';
import closIcon from '../../images/close.svg';
import accountIcon from '../../images/account.svg';
function Navigation(props) {

    return (
        <div
          className={`navigation${props.isOpen ? " navigation_is-opened" : ""}`}
        >
            <Route path='/movies'>
            <img
              onClick={props.onClose}
              className='navigation__close'
              alt="Закрыть"
              src={closIcon}
            ></img>
          <nav>
            <Link className='navigation__link' to='/'>Главная</Link>
            <Link className='navigation__link navigation__link_active' to='movies'>Фильмы</Link>
            <Link className='navigation__link' to='saved-movies'>Сохранённые фильмы</Link>
          </nav>

          <div className='navigation__account'>
            <img
              className='navigation__account_icon'
              alt="Аккаунт"
              src={accountIcon}
            ></img>
            <button type="button" to='profile' onClick={props.Relogin}>
              Аккаунт
            </button>
          </div>
            </Route>
        </div>
        
      );
}
export default Navigation;