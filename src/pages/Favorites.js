import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      allSongs: [],
    };
  }

  async componentDidMount() {
    const favMusic = await getFavoriteSongs();
    this.setState({ allSongs: favMusic });
  }

  async shouldComponentUpdate() {
    const favMusic = await getFavoriteSongs();
    this.setState({ allSongs: favMusic });
  }

  render() {
    const { allSongs } = this.state;

    return (
      <section className="bg-black w-screen h-screen flex flex-col items-center">
        <h3 className="text-white fav text-lg">Favorites</h3>
        <div className="favorites" data-testid="page-favorites">
          <MusicCard songs={ allSongs } />
          <Header />
        </div>
      </section>
    );
  }
}

export default Favorites;
