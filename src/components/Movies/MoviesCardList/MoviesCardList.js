import {React, useState, useEffect, Suspense, lazy} from "react";
const MoviesCard = lazy(() => import('../MoviesCard/MoviesCard'));
import Preloader from "../Preloader/Preloader"

function MoviesCardList({
  onCardClick,
  filtredMovies,
  isGetMovies,
  handleCardLike,
  onCardDelete,
  savefilms,
  isShortFilms,
}) {

  const sortfilm = filtredMovies !== null ? filtredMovies.filter(movie => movie.duration < 40) : filtredMovies

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
    <Suspense fallback={<Preloader/>}>
      <main className="content">

        { filtredMovies !== null && filtredMovies.length > 0 ?
          <section className="elements">
            { !isShortFilms ?
            filtredMovies.slice(0, listItems).map((item) => {
              filtredMovies
              .filter(e => savefilms.map(e2 => e2.movieId).includes(e.id))
              .map(e => {
                e.isLiked = true
              });
          
              return (
                  <MoviesCard
                    onCardClick={onCardClick}
                    key={item.id}
                    {...item}
                    onCardLike={handleCardLike}
                    onCardDelete={onCardDelete}
                  />
              );
            }) : 
            sortfilm.slice(0, listItems).map((item) => {
              filtredMovies
              .filter(e => savefilms.map(e2 => e2.movieId).includes(e.id))
              .map(e => {
                e.isLiked = true
              });
          
              return (
                  <MoviesCard
                    onCardClick={onCardClick}
                    key={item.id}
                    {...item}
                    onCardLike={handleCardLike}
                    onCardDelete={onCardDelete}
                  />
              );
            })
            }
          </section>
           : isGetMovies === true ? 
           <h2 className="elements__not-found">Ничего не найдено</h2> : '' 
        }
        <section className={`more${filtredMovies !== null && filtredMovies.length > listItems  ? "" : " more_hidden"}`}>
            <button
              className="more__button"
              onClick={() => setListItems(listItems + Math.floor(listItems/4))}
            >
                Еще
            </button>
        </section>
      </main>
    </Suspense>
  );
}
export default MoviesCardList;
