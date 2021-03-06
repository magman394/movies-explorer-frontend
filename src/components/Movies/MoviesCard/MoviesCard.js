import React from "react";
import { linkMovies } from "../../../utils/constants";

function MoviesCard({
  trailerLink,
  image,
  nameRU,
  country,
  onCardLike,
  duration,
  id,
  director,
  year,
  description,
  nameEN,
  isLiked,  
}) {
  const thumbnail = linkMovies + image.formats.thumbnail.url;
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
      id,
      isLiked,
      thumbnail
    );
  }

    let hours = Math.trunc(duration/60);
  	let minutes = duration % 60;


  const cardLikeButtonClassName = `${
    isLiked
      ? "element__likes_active element__likes_like-btn"
      : "element__likes element__likes_like-btn"
  }`;
  
  return (
    <div className="elements__box">
      <div className="element">
        <img
          className="element__image"
          src={linkMovies + image.url}
          onClick={handleClick}
          alt={nameRU}
        />
        <div className="element__info">
          <div className="element__likes">
            <span className="element__title">{nameRU}</span>
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
          </div>
            <p className="element__time-movie">{`${hours}ч ${minutes}м`}</p>
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;
