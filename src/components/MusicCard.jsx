import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: false,
      loading: false,
    };
  }

  favSong = async () => {
    const { paramFav } = this.props;
    this.setState((previous) => ({ loading: true, favorite: !previous.favorite }));
    const res = await addSong(paramFav);
    console.log(res);
    this.setState({ loading: false });
  };

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            <li>
              <p>{trackName}</p>
              <br />
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                Your browser does not support the
                {' '}
                <code>audio</code>
                {' '}
                element
              </audio>
              <label htmlFor="input-favorite">
                Favorite
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id="input-favorite"
                  onChange={ this.favSong }
                  checked={ favorite }
                />
              </label>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
