import React from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {

    return (
      <div className="search">
        <form
          className="search__form"
          onSubmit={props.handleSubmit}
          required
        >
        <input
          className="search__input"
          name="movies"
          placeholder="Фильм"
          type="text"
          ref={props.input} />
      <botton
        className="search__form_botton"
        type="submit"
        onClick={props.Search}
     />
    </form>
        <FilterCheckbox />
      </div>
  );
}
export default SearchForm;