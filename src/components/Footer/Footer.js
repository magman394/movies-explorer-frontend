import React from 'react';
import { currentYear } from '../../utils/constants';
function Footer() {
    return (
        <footer className='footer' id="footer">
          <h2 className='footer__title'>
          Учебный&nbsp;проект&nbsp;Яндекс.Практикум&nbsp;х&nbsp;BeatFilm.
          </h2>
          <div className='footer__floor'>
          <p className='footer__copyright'>&copy;&nbsp;{currentYear}</p>
          <nav className='footer__nav'>
            <a className='footer__nav-link' href='https://praktikum.yandex.ru/' target='_blank' rel="noreferrer">Яндекс.Практикум</a>
            <a className='footer__nav-link' href='https://github.com/magman394' target='_blank' rel="noreferrer">Github</a>
            <a className='footer__nav-link' href='https://vk.com/ibelokopytov' target='_blank' rel="noreferrer">vk.com</a>
          </nav>
          </div>
        </footer>
  );
}
export default Footer;