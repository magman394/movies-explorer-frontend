import React from 'react'


function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">
                О проекте
            </h2>
            <div className="about-project__diplom">
                <div className="about-project__diplom_content">
                    <h3 className="about-project__content_title">
                        Дипломный проект включал 5 этапов
                    </h3>
                    <p className="about-project__content_text">
                        Составление плана, работу над бэкендом, вёрстку,
                        добавление функциональности и финальные доработки.
                    </p>
                </div>
                <div className="about-project__diplom_content">
                    <h3 className="about-project__content_title">
                        На выполнение диплома ушло 5 недель
                    </h3>
                    <p className="about-project__content_text">
                        У каждого этапа был мягкий и жёсткий дедлайн, которые
                         нужно было соблюдать, чтобы успешно защититься.
                    </p>
                </div>
            </div>
            <div className="about-project__time">
                <div className="about-project__time_start">
                    <h4 className="about-project__time_start-title">1 неделя</h4>
                    <i className="about-project__time_text">Back-end</i>
                </div>
                <div className="about-project__time_end">
                    <h4 className="about-project__time_end-title">4 недели</h4>
                    <i className="about-project__time_text">Front-end</i>
                </div>
            </div>
        </section>
    )
};

export default AboutProject
