import {React, useState, useEffect} from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {

    const getWidth = () => {
        if (window.innerWidth < 680) {
            return 5;
        } else if(window.innerWidth < 800) {
            return 8;
        } else {
            return 12;
        }
    }
  
  const [listItems, setListItems] = useState(getWidth());
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setListItems(getWidth()), 1000);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return (
    <main className="content">
      <section className="elements">
        {cards.slice(0, listItems).map((item) => {
          return (
            <MoviesCard
              onCardClick={onCardClick}
              key={item._id}
              {...item}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
      <section className="more">
          <button
            className="more__button"
            onClick={() => setListItems(listItems + listItems)}
          >
              Еще
          </button>
      </section>
    </main>
  );
}
export default MoviesCardList;
