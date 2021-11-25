import React from "react";
import { FormErrors } from '../FormErrors/FormErrors';
import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      formErrors: {name: "", email: '', password: ''},
      nameValid: false,
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
    this.onRegister = props.onRegister;
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
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
      case 'name':
        nameValid = value.match(/^([а-яё\s]+|[a-z\s]+)$/iu);
        fieldValidationErrors.name = nameValid ? '' : 'Имя может содержать только латиницу, кириллицу, пробел или дефис!';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Почта введена не верно!';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': 'Пароль должен быть больше 6 символов!';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password, email, name } = this.state;
    this.onRegister({ password, email, name });
  }

  render() {
    return (
      <div className="register">
        <form onSubmit={this.handleSubmit} className="register__form">
          <Link className="register__logo" to='/main'></Link>
          <h2 className="register__title">Добро пожаловать!</h2>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label className="register__input_title">
              Имя
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleUserInput}
            className="register__input"
            required
          ></input>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label className="register__input_title">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleUserInput}
            className="register__input"
            required
          ></input>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label className="register__input_title">
            Пароль
          </label >
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleUserInput}
            className="register__input"
            required
          ></input>
          </div>
          <FormErrors formErrors={this.state.formErrors} />
          <button type="submit" className={this.state.formValid ? "register__submit" : "register__submit_disabled" } disabled={!this.state.formValid}>
            Зарегистрироваться
          </button>
        </form>
        <h4 className="register__subtitle">
          Уже зарегистрированы?{" "}
          <Link className="register__link" to="signin">
            Войти
          </Link>
        </h4>
      </div>
    );
  }
}

export default Register;
