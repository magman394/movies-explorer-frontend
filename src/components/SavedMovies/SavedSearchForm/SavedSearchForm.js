import React from "react";
import FilterCheckbox from "../../Movies/FilterCheckbox/FilterCheckbox";

function SavedSearchForm({ onSetSearchMovies, onHandleMovies, onShortFilms, notSearchSavedFilms, isShortFilms }) {
    return (
      <div className="search">
        <form
          className="search__form"
          onSubmit={onHandleMovies}
        >
        <input
          className="search__input"
          id="Movies"
          name="Movies"
          placeholder="Фильм"
          type="text"
          onChange={(e) => {
            onSetSearchMovies(e.target.value.toLowerCase());
          }}
          />
          <span className={notSearchSavedFilms ? "form__error" : "form__error_hidden" }>Нужно ввести ключевое слово.</span>
      <button
        className="search__form_button"
        type="submit"
        onClick={onHandleMovies}
      />
    </form>
        <FilterCheckbox 
        isShortFilms={isShortFilms}
        onShortFilms={onShortFilms}
        />
      </div>
  );
}
export default SavedSearchForm;