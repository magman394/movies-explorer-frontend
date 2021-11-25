import React from "react";


function SavedMoviesCard({
  country,
  director,
  duration,
  year,
  description,
  image,
  trailer,
  nameRU,
  nameEN,
  movieId,
  isLiked,  
  thumbnail,
  onCardLike
}) {
  isLiked = true;
  const trailerLink = trailer;
  function handleClick() {
    open(trailerLink);
  }
  function handleLikeClick() {

    onCardLike(
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      movieId,
      isLiked,  
      thumbnail
    );
  }

    let hours = Math.trunc(duration/60);
  	let minutes = duration % 60;


  
  return (
    <div className="elements__box">
      <div className="element">
        <img
          className="element__image"
          src={image}
          onClick={handleClick}
          alt={nameRU}
        />
        <div className="element__info">
          <div className="element__likes">
            <span className="element__title">{nameRU}</span>
            <button
              type="button"
              className="element__likes element__likes_like-btn-delete"
              onClick={handleLikeClick}
            ></button>
          </div>
            <p className="element__time-movie">{`${hours}ч ${minutes}м`}</p>
        </div>
      </div>
    </div>
  );
}

export default SavedMoviesCard;
