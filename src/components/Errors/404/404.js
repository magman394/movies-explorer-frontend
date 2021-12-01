import React from 'react'
import { useHistory } from 'react-router-dom';

function Error404() {
    const history = useHistory();
    function handleClick() {
        history.push("/");
    }
    return (
        <div className="error-404">
            <h1 className="error-404__title">404</h1>
            <p className="error-404__text">Страница не найдена</p>
            <button type="button" className="error-404__link" onClick={handleClick}>Назад</button>
        </div>
    );
}

export default Error404
