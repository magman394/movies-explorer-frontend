import React from "react";
import { FormErrors } from '../FormErrors/FormErrors';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem('name'),
      nameTitle: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      formErrors: {name: '', email: ''},
      nameValid: false,
      emailValid: false,
      formValid: false,
    };
    this.onEditProfile = props.onEditProfile;
    this.onRelogin = props.Relogin;
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleUserInput(e) {
    const { name, value } = e.target;
    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;

    switch(fieldName) {
      case 'name':
        nameValid = value.match(/^([а-яё\s]+|[a-z\s]+)$/iu);
        fieldValidationErrors.name = nameValid ? '' : 'Имя может содержать или только латиницу или только кириллицу, пробел или дефис!';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Почта введена не верно!';
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    emailValid: emailValid,
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.nameValid || this.state.emailValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, name } = this.state;
    this.state.nameTitle = name;
    this.onEditProfile({ email, name });
    this.state.formValid = false
  }

render() {
  return (
    <div className="profile">
      <form onSubmit={this.handleSubmit} className="profile__form">
        <h2 className="profile__title">Привет, {this.state.nameTitle}!</h2>
        <fieldset className="profile__input_name">
          <label className="profile__input_lebel">Имя</label>
          <input
            value={this.state.name}
            onChange={this.handleUserInput}
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
          <label className="profile__input_lebel">E-mail</label>
          <input
            value={this.state.email}
            onChange={this.handleUserInput}
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
        <FormErrors formErrors={this.state.formErrors} />
        <button onClick={this.onEditProfile} type="submit" className={this.state.formValid ? "profile__edit-button" : "profile__edit-button_disabled"} disabled={!this.state.formValid}>
          Редактировать
        </button>
        <button className='profile__exit-button' onClick={this.onRelogin}>
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}
}
export default Profile;
