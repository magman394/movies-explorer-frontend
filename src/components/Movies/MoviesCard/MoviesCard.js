import React from "react";
import { useLocation } from "react-router-dom";
function MoviesCard({
  onCardClick,
  link,
  name,
  likes,
  onCardLike,
  time,
  _id,
}) {

  function handleClick() {
    onCardClick({ img: link, title: name });
  }
  function handleLikeClick() {
    onCardLike(likes, _id);
  }



  const location = useLocation();
  const isLiked = true;
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
          src={link}
          onClick={handleClick}
          alt={name}
        />
        <div className="element__info">
          <div className="element__likes">
            <h3 className="element__title">{name}</h3>
            <button
              type="button"
              className={(location.pathname === "/movies") ? cardLikeButtonClassName : "element__likes element__likes_like-btn-delete"}
              onClick={handleLikeClick}
            ></button>
          </div>
            <p className="element__time-movie">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default MoviesCard;
