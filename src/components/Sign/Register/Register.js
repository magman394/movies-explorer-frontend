import React from "react";

import { Link } from "react-router-dom";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
    };
    this.onRegister = props.onRegister;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
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
          <span className="register__input_title">
              Имя
          </span>
          <input
            id="name"
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
            className="register__input"
          ></input>
          <span className="register__input_title">
            E-mail
          </span>
          <input
            id="email"
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="register__input"
          ></input>
          <span className="register__input_title">
            Пароль
          </span>
          <input
            id="password"
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="register__input"
          ></input>
          <button type="submit" className="register__submit">
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
