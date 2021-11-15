import React from "react";
import { HashLink } from 'react-router-hash-link';

function NavTab() {
    return (
          <nav className='navtab'>
            <HashLink className='navtab__link' to='#about-project'>О проекте</HashLink>
            <HashLink className='navtab__link' to='#techs'>Технологии</HashLink>
            <HashLink className='navtab__link' to='#about-me'>Студент</HashLink>
          </nav>
  );
}
export default NavTab;