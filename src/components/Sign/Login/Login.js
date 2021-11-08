import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.onLogin = props.onLogin;
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
    const { password, email } = this.state;
    this.onLogin({ password, email });
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login__form">
          <Link className="login__logo" to='/main'></Link>
          <h2 className="login__title">Рады видеть!</h2>
          <span className="login__input_title">
            E-mail
          </span>
          <input
            name="email"
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
            className="login__input"
          ></input>
          <span className="login__input_title">
            Пароль
          </span>
          <input
            name="password"
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            className="login__input"
          ></input>
          <button type="submit" className="login__submit">
            Войти
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
