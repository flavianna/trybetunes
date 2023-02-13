import React from 'react';
import Header from '../components/Header';
import AlbumCardList from '../components/AlbumCardList';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const numberValidation = 2;

class Search extends React.Component {
  state = {
    disableBtn: true,
    search: '',
    albumSearch: [],
  };

  handleValidationInput = ({ target: { value } }) => (value.length >= numberValidation
    ? this.setState({
      disableBtn: false,
      search: value,
    })
    : this.setState({
      disableBtn: true,
      search: value,
    }));

  searchResponse = async () => {
    const { search } = this.state;
    const res = await searchAlbumsAPI(search);
    this.setState({ albumSearch: res });
  };

  render() {
    const { disableBtn, albumSearch } = this.state;
    const verification = albumSearch.length > 0;
    return (

      <div
        className="h-screen w-screen flex flex-wrap justify-center bg-black"
        data-testid="page-search"
      >
        <Header />
        <div className="flex justify-center my-40">
          <form className="w-64 mx-auto">
            <div className="flex align-items-center">
              <h2 className="text-2xl font-bold ml-7 text-white mt-1">
                Trybetunes
              </h2>
              <span
                className="material-symbols-outlined ml-1 text-4xl
              text-pink-600"
              >
                equalizer
              </span>
            </div>
            <input
              data-testid="search-artist-input"
              type="text"
              placeholder="Artist"
              onChange={ this.handleValidationInput }
              className="bg-white focus:outline-none focus:shadow-outline border
               border-gray-300 rounded-full py-2 px-4 block w-64 mt-5 mx-auto"
            />
            <button
              disabled={ disableBtn }
              data-testid="search-artist-button"
              type="button"
              onClick={ this.searchResponse }
              className="bg-lime-400 p-3 w-full mt-5 rounded-full
              shadow hover:bg-green-500 hover:text-white mx-auto"
            >
              Search
            </button>
          </form>
        </div>
        <div className="flex flex-wrap justify-center align-items bg-black">
          {verification ? (
            albumSearch.map((card, index) => (
              <div key={ index }>
                <AlbumCardList
                  collectionName={ card.collectionName }
                  collectionImage={ card.artworkUrl100 }
                  collectionId={ card.collectionId }
                />
              </div>
            ))
          ) : (
            <h2 className="flex text-white mt-5 justify-center">...</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
