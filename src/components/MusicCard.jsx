import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class MusicCard extends Component {
  render() {
    const { searchAlbums } = this.props;
    return (
      <div>
        {
          searchAlbums.map((element) => (
            <Link
              data-testid={ `link-to-album-${element.collectionId}` }
              key={ element.collectionId }
              to={ `/album/${element.collectionId} ` }
            >
              <div>
                <img
                  src={ element.artworkUrl100 }
                  alt={ `Imagem do álbum ${element.collectionName}` }
                />
                <h4>{element.collectionName}</h4>
              </div>
            </Link>
          ))
        }
      </div>
    );
  }
}
MusicCard.propTypes = {
  searchAlbums: PropTypes.arrayOf(PropTypes.shape({
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  })).isRequired,
};
