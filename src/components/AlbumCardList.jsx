import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCardList extends React.Component {
  render() {
    const { collectionName, collectionImage, collectionId } = this.props;
    return (
      <div>
        <br />
        <h3>{collectionName}</h3>
        <br />
        <img src={ collectionImage } alt={ collectionName } />
        <br />
        <NavLink
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Link to Album

        </NavLink>
        <hr />
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
