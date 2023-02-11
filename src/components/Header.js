import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.userInformation();
  }

  userInformation = async () => {
    const infoUser = await getUser();
    this.setState({ user: infoUser.name, loading: false });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="flex justify-center">
          {loading ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">{user}</p>
          )}
        </div>
        <section>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </section>
      </header>
    );
  }
}
