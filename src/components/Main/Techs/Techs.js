import React from 'react'


function Techs() {
    return (
        <section className="techs" id="techs">
            <h2 className="techs__title">
                Технологии
            </h2>
            <div className="techs__content">
                <h3 className="techs__content_title">
                    7 технологий
                </h3>
                <p className="techs__content_text">
                    На курсе веб-разработки мы освоили технологии, 
                    которые применили в дипломном проекте.
                </p>
            </div>
            <ul className="techs__list">
                <li className="techs__list_icon">HTML</li>
                <li className="techs__list_icon">CSS</li>
                <li className="techs__list_icon">JS</li>
                <li className="techs__list_icon">React</li>
                <li className="techs__list_icon">Git</li>
                <li className="techs__list_icon">Express.js</li>
                <li className="techs__list_icon">mongoDB</li>
            </ul>
        </section>
    )
};

export default Techs
