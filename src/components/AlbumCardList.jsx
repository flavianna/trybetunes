import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCardList extends React.Component {
  render() {
    const { collectionName, collectionImage, collectionId } = this.props;
    return (
      <div className="card-container bg-black">
        <div className="card">
          <img className="card-image" src={ collectionImage } alt={ collectionName } />
          <div className="card-info">
            <div className="card-title">{collectionName}</div>
            <NavLink
              data-testid={ `link-to-album-${collectionId}` }
              to={ `/album/${collectionId}` }
              class="card-link"
            >
              <span
                className="material-symbols-outlined  stroke-2 text-4xl
                fill-current text-lime-400"
              >
                play_circle
              </span>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

AlbumCardList.propTypes = {
  collectionId: PropTypes.string,
  collectionName: PropTypes.string,
  collectionImage: PropTypes.string,
}.isRequired;

export default AlbumCardList;
