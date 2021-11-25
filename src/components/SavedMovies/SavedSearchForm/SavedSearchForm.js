import React from "react";
import FilterCheckbox from "../../Movies/FilterCheckbox/FilterCheckbox";

function SavedSearchForm({ onSetSearchMovies, onHandleMovies, onShortFilms }) {
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
            onSetSearchMovies(e.target.value);
          }}
          minLength="2"
          maxLength="40"
          required
          />
          <span id="Movies-error" className="form__error">Минимальная длина 2 символа.</span>
      <button
        className="search__form_button"
        type="submit"
        onClick={onHandleMovies}
      />
    </form>
        <FilterCheckbox 
        onShortFilms={onShortFilms}
        />
      </div>
  );
}
export default SavedSearchForm;