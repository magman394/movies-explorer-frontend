import {React, useState, useEffect, Suspense, lazy} from "react";
const SavedMoviesCard = lazy(() => import('../../SavedMovies/SavedMoviesCard/SavedMoviesCard'));
import Preloader from "../../Movies/Preloader/Preloader"

function SavedMoviesCardList({
  onCardClick,
  isGetMovies,
  handleCardLike,
  onCardDelete,
  savefilms,
  isShortFilms,
}) {
  const sortfilm = savefilms.filter(movie => movie.duration < 40);
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

        { savefilms !== null && savefilms.length > 0 ?
          <section className="elements">
            { !isShortFilms ?
            savefilms.slice(0, listItems).map((item) => {
              return (
                  <SavedMoviesCard
                    onCardClick={onCardClick}
                    key={item._id}
                    {...item}
                    onCardLike={handleCardLike}
                    onCardDelete={onCardDelete}
                  />
              );
            }) :
            sortfilm.slice(0, listItems).map((item) => {
              return (
                  <SavedMoviesCard
                    onCardClick={onCardClick}
                    key={item._id}
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
        <section className={`more${savefilms !== null && savefilms.length > listItems  ? "" : " more_hidden"}`}>
            <button
              className="more__button"
              onClick={() => setListItems(listItems + listItems)}
            >
                Еще
            </button>
        </section>
      </main>
    </Suspense>
  );
}
export default SavedMoviesCardList;
