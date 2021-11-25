import React from "react";

import popupCloseIcon from "../../images/Close-Icon.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup${props.isOpen ? " popup_is-opened" : ""}`}
      id={props.name}
    >
      <div className="popup__register">
        <button type="button" className="popup__close opacity-link">
          <img
            src={popupCloseIcon}
            onClick={props.onClose}
            alt="кнопка закрытия"
          />
        </button>
        <img
          className="popup__image popup__image_register"
          alt={props.isInfo.text}
          src={props.isInfo.img}
        />
        <h2 className="popup__title popup__title_register">
          {props.isInfo.text}
        </h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
