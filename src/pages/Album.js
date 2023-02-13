import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      listSongs: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.foundSongs(id);
  }

  foundSongs = async (id) => {
    const fetchMusic = await getMusics(id);
    this.setState({
      listSongs: fetchMusic,
      loading: false,
    });
  };

  render() {
    const { loading, listSongs } = this.state;
    if (loading) {
      return (
        <p
          className="bg-black w-screen h-screen flex
      text-white flex-col items-center"
        >
          loading...
        </p>
      );
    }
    return (
      <>
        <Header />
        <div className="bg-black w-screen flex flex-col items-center">
          <div className="bg-black w-screen flex flex-col items-center container-Album">
            <img
              className="image"
              src={ listSongs[0].artworkUrl100 }
              alt="Imagem do Album"
            />
            <h2 className="text-white mt-5" data-testid="artist-name">
              {listSongs[0].artistName}
            </h2>
            <h3 className="text-white mt-5" data-testid="album-name">
              {listSongs[0].collectionName}
            </h3>
          </div>
          <MusicCard songs={ listSongs } />
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
