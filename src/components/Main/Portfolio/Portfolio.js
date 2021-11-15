import React from 'react'
import portfolioImg from '../../../images/portfolio-img.svg'

function Portfolio() {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">
                Портфолио
            </h3>
            <a 
            className="portfolio__site" 
            href="https://github.com/magman394/how-to-learn"
            target="_blank" 
            rel="noreferrer"
            >
                <p className="portfolio__site_name">
                    Статичный сайт
                </p>
                <img
                  className="portfolio__site_img"
                  src={portfolioImg}
                  alt="Ссылка на статичный сайт">
                </img>
            </a>
            <a 
            className="portfolio__site" 
            href="https://github.com/magman394/russian-travel"
            target="_blank" 
            rel="noreferrer"
            >
                <p className="portfolio__site_name">
                    Адаптивный сайт
                </p>
                <img
                  className="portfolio__site_img"
                  src={portfolioImg}
                  alt="Ссылка на Адаптивный сайт">
                </img>
            </a>
            <a 
            className="portfolio__site" 
            href="https://github.com/magman394/mesto"
            target="_blank" 
            rel="noreferrer"
            >
                <p className="portfolio__site_name">
                    Одностраничное приложение
                </p>
                <img
                  className="portfolio__site_img"
                  src={portfolioImg}
                  alt="Ссылка на Одностраничное приложение">
                </img>
            </a>
        </section>
    )
};

export default Portfolio
