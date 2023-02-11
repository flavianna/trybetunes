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
      <div className="bg-stone-200 min-h-screen">

        <header
          className="shadow-md w-full fixed top-0 left-0 md:flex bg-white py-4 space-x-6"
          data-testid="header-component"
        >
          <div>
            {loading ? (
              <Loading />
            ) : (
              <p data-testid="header-user-name">
                Welcome,
                <p>
                  {user}
                </p>

              </p>
            )}
            <section className="w-full top-0 left-0 md:flex bg-white py-4 space-x-6">
              <Link data-testid="link-to-search" to="/search">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </section>
          </div>

        </header>
      </div>
    );
  }
}
