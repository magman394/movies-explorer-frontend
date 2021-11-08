import React from 'react'
import me from '../../../images/me.jpg'

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">
                Студент
            </h2>
            <div className="about-me__content">
                <div className="about-me__content_profile">
                    <h2 className="about-me__content_me">
                        Илья
                    </h2>
                    <p className="about-me__content_profession">
                        Фронтенд-разработчик, 32 года
                    </p>
                    <p className="about-me__content_text">
                    Я родился и живу в Москве, закончил МГУТУ им.Разумовского экономического факультета.
                     Уже больше 10 лет работаю в e-commerce проектах. Прошел путь от контент-менеджера
                     до руководителя отдела контента. Сейчас руковожу отделом контента в 4lapy.ru и в
                     свободное время занимаюсь веб-разработкой.
                    </p>
                    <div className="about-me__content_links">
                        <a
                            className="about-me__content_link"
                            href='https://vk.com/ibelokopytov'
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Vk.com
                        </a>
                        <a 
                            className="about-me__content_link" 
                            href='https://github.com/magman394' 
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                    </div>
                </div>
                <img className="about-me__content_img" src={me} alt="Фото студента"></img>
            </div>
        </section>
    )
};

export default AboutMe
