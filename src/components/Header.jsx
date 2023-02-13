import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,

    };
  }

  componentDidMount() {
    this.userInformation();
  }

  userInformation = async () => {
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    return (
      <div>
        <header
          className="shadow-md w-full fixed top-0 left-0
           bg-black py-4 px-6 flex-col"
        >
          <nav className="flex">
            <span
              className="material-symbols-outlined stroke-2 text-3xl
            fill-current text-lime-400"
            >
              headphones
            </span>
            <Link
              className="px-4 py-2 text-sm font-bold
               text-white hover:bg-neutral-700 font-sans rounded"
              data-testid="link-to-search"
              to="/search"
            >
              Search
            </Link>
            <Link
              className="px-4 py-2 text-sm font-bold
              text-white hover:bg-neutral-700 font-sans rounded"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favorites
            </Link>
            <Link
              className="px-4 py-2 text-sm font-bold
              text-white hover:bg-neutral-700 font-sans rounded"
              data-testid="link-to-profile"
              to="/profile"
            >
              Profile
            </Link>
            <div className="flex items-center ml-auto">
              {loading ? (
                <Loading />
              ) : (

                <div
                  className="w-7 h-7 rounded-full bg-white ml-auto"
                />

              )}
            </div>
          </nav>
        </header>
      </div>
    );
  }
}
