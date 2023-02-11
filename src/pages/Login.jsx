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
    this.setState({
      [name]: value,
    }, () => {
      const state = { ...this.state };
      const btnDesabled = state.user.length < minimumCharacters
      || state.password.length < minimumCharacters;
      this.setState({
        disabledBtn: btnDesabled,
      });
    });
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
      <div data-testid="page-login">
        <form>
          <label htmlFor="text">
            <input
              data-testid="login-name-input"
              name="user"
              type="text"
              onChange={ this.handleChange }
              value={ user }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="login-password-input"
              name="password"
              type="password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ disabledBtn }
            onClick={ this.handleClick }
          >
            Entrar
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
