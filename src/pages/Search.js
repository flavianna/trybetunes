import React, { Component } from 'react';
import MusicCard from '../components/MusicCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      artist: '',
      disableBtn: true,
      loading: false,
      albumSearch: [],
      results: false,
      name: false,
    };
  }

  enableButton = () => {
    const { artist } = this.state;
    if (artist.length >= 2) {
      this.setState({
        disableBtn: false,
      });
    }
  };

  handleInputChange = ({ target }) => {
    const artist = target.value;
    this.setState({
      artist,
    }, () => {
      this.enableButton();
    });
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({
      loading: true,
    });
    const albuns = await searchAlbumsAPI(artist);
    this.setState({
      name: true,
      albumSearch: albuns,
      loading: false,
    }, () => {
      const { albumSearch } = this.state;
      if (albumSearch.length === 0) {
        this.setState({ results: false });
      } else {
        this.setState({ results: true });
      }
    });
  };

  render() {
    const { artist, disableBtn, loading, albumSearch, results, name } = this.state;
    return (
      loading ? <Loading /> : (
        <div data-testid="page-search">
          <Header />
          <form>
            <label htmlFor="Artist-Name">
              <input
                data-testid="search-artist-input"
                name="artist"
                type="text"
                placeholder="Nome do artista"
                onChange={ this.handleInputChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              disabled={ disableBtn }
              type="button"
              onClick={ this.handleClick }
            >
              Buscar
            </button>
          </form>
          {name && (<h3>{`Resultado de álbuns de: ${artist}`}</h3>)}
          {results ? (
            <div>
              <MusicCard searchAlbums={ albumSearch } />
            </div>
          ) : <h2>Nenhum álbum foi encontrado</h2>}
        </div>
      )
    );
  }
}
