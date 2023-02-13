import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      fav: [],
    };
  }

  async componentDidMount() {
    const listSongs = await getFavoriteSongs();
    const id = await listSongs.map((parameter) => parameter.trackId);
    this.setState({ fav: await id });
  }

  checkboxInput = async ({ target }) => {
    const { songs } = this.props;
    const { fav } = this.state;

    if (target.checked) {
      const favMusic = songs.find((e) => e.trackId === Number(target.name));
      this.setState((prev) => ({
        loading: true,
        fav: [...prev.fav, favMusic.trackId],
      }));
      await addSong(await favMusic);
    } else {
      const favMusic = songs.find((e) => e.trackId === Number(target.name));
      const removedFav = fav
        .filter((e) => Number(e) !== Number(target.name));
      this.setState({
        loading: true,
        fav: removedFav,
      });
      await removeSong(await favMusic);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { songs } = this.props;
    const { loading, fav } = this.state;
    if (loading) {
      return <p>loading...</p>;
    }
    return (
      <div className="music-card-container">
        {songs.map((element, i) => (
          element.trackId
        && (
          <div key={ i } className="music-card">
            <h4 className="music-card-title">{element.trackName}</h4>
            <audio
              className="music-card-player"
              data-testid="audio-component"
              src={ element.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label
              htmlFor={ `checkbox-music-${element.trackId}` }
              data-testid={ `checkbox-music-${element.trackId}` }
            >
              <input
                className="accent-lime-400"
                type="checkbox"
                name={ element.trackId }
                id={ `checkbox-music-${element.trackId}` }
                onChange={ this.checkboxInput }
                checked={ fav.includes(element.trackId) }
              />
              {' Favorite'}
            </label>
          </div>
        )
        ))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default MusicCard;
