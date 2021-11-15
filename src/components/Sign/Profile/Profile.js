import React from "react";


function Profile({ name, email, Relogin }) {

  const [editname, setName] = React.useState(name);
  const [editmail, setMail] = React.useState(email);
  function handleChangeName(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    e.preventDefault();
    setMail(e.target.value);
  }

  React.useEffect(() => {
    setName(name);
    setMail(email);
  }, [email, name]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="profile">
      <form onSubmit={handleSubmit} className="profile__form">
        <h2 className="profile__title">Привет, {name}!</h2>
        <fieldset className="profile__input_name">
          <label className="profile__input_lebel" for="name">Имя</label>
          <input
            value={editname}
            onChange={handleChangeName}
            name="name"
            id="name"
            type="text"
            className="profile__input"
            minLength="2"
            maxLength="40"
            required
            placeholder="Имя"
          />
        </fieldset>
        <span id="name-error" className="profile__error"></span>
        <fieldset className="profile__input_email">
          <label className="profile__input_lebel" for="email">E-mail</label>
          <input
            value={editmail}
            onChange={handleChangeDescription}
            name="email"
            id="email"
            type="text"
            className="profile__input"
            minLength="2"
            maxLength="200"
            required
            placeholder="E-mail"
          />
        </fieldset>
        <span id="email-error" className="profile__error"></span>
        <button onClick={true} type="submit" className="profile__edit-button">
          Редактировать
        </button>
        <button className='profile__exit-button' onClick={Relogin}>
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
export default Profile;
