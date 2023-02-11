import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      password: '',
      disabledBtn: true,
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const minimumCharacters = 6;
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        const state = { ...this.state };
        const btnDesabled = state.user.length < minimumCharacters
          || state.password.length < minimumCharacters;
        this.setState({
          disabledBtn: btnDesabled,
        });
      },
    );
  };

  handleClick = () => {
    this.setState({ loading: true }, async () => {
      const { history } = this.props;
      const { user, password } = this.state;
      await createUser({ name: user, password });
      history.push('/search');
    });
  };

  render() {
    const { user, password, disabledBtn, loading } = this.state;
    return (
      <div
        data-testid="page-login"
        className="bg-stone-200 min-h-screen flex items-center justify-center"
      >
        <form className="bg-white px-16 py-12 rounded-2xl shadow-lg text-center">
          <span className="material-symbols-outlined stroke-2 text-8xl  ">
            headphones
          </span>
          <h2 className="text-2xl p-5 font-bold">Trybetunes</h2>
          <label htmlFor="text">
            <input
              className="w-full block bg-black rounded p-2 text-white"
              data-testid="login-name-input"
              name="user"
              type="text"
              onChange={ this.handleChange }
              value={ user }
              placeholder="Email"
            />
            <h1 className="text-xs text-left mb-4 text-gray-600">
              Enter a valid email
            </h1>
          </label>
          <label htmlFor="password">
            <input
              className="w-full block bg-black rounded p-2 text-white"
              data-testid="login-password-input"
              name="password"
              type="password"
              onChange={ this.handleChange }
              value={ password }
              placeholder="Password"
            />
            <h1 className="text-xs text-left text-gray-600">
              Password must be at least 6 characters
            </h1>
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabledBtn }
            onClick={ this.handleClick }
            className="bg-lime-400 p-3 w-full mt-5 rounded-lg
            shadow hover:bg-green-500 hover:text-white"
          >
            Login
          </button>
          {loading && <Loading />}
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
