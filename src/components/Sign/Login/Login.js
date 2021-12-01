import React from "react";
import { FormErrors } from '../FormErrors/FormErrors';
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
    };
    this.onLogin = props.onLogin;
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
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch(fieldName) {
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
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }


  handleSubmit(e) {
    e.preventDefault();
    const { password, email } = this.state;
    this.onLogin({ password, email });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login__form">
          <Link className="login__logo" to='/'></Link>
          <h2 className="login__title">Рады видеть!</h2>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label className="login__input_title">
            E-mail
          </label>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleUserInput}
            className="login__input"
          ></input>
          </div>
          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label className="login__input_title">
            Пароль
          </label>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleUserInput}
            className="login__input"
          ></input>
          </div>
          <FormErrors formErrors={this.state.formErrors} />
          <button
            type="submit"
            className={this.state.formValid ? "register__submit" : "register__submit_disabled" }
            disabled={!this.state.formValid}>
            Войти
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
