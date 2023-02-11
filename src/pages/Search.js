import React from 'react';
import Header from '../components/Header';
import AlbumCardList from '../components/AlbumCardList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const numberValidation = 2;

class Search extends React.Component {
  state = {
    disableBtn: true,
    search: '',
    loading: false,
    albumSearch: [],
  };

  handleValidationInput = ({ target: { value } }) => (
    value.length >= numberValidation
      ? this.setState({
        disableBtn: false, search: value })
      : this.setState({
        disableBtn: true, search: value }));

  searchResponse = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const res = await searchAlbumsAPI(search);
    this.setState({ loading: false, albumSearch: res });
  };

  render() {
    const { disableBtn, search, loading, albumSearch } = this.state;
    const verification = albumSearch.length > 0;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <span>loading...</span>
            : (
              <forms>
                <input
                  data-testid="search-artist-input"
                  type="text"
                  placeholder="Artist"
                  onChange={ this.handleValidationInput }
                />
                <button
                  disabled={ disableBtn }
                  data-testid="search-artist-button"
                  type="button"
                  onClick={ this.searchResponse }
                >
                  Search

                </button>
              </forms>
            )
        }
        <span>{`Results: ${search}`}</span>
        {verification
          ? albumSearch.map((card, index) => (
            <div key={ index }>
              <AlbumCardList
                collectionName={ card.collectionName }
                collectionImage={ card.artworkUrl100 }
                collectionId={ card.collectionId }
              />
            </div>))
          : <h2>No albums were found</h2> }
      </div>
    );
  }
}

export default Search;
