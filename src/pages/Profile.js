import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      information: {},
    };
  }

  async componentDidMount() {
    const profileInformation = await getUser();
    this.setState({ information: profileInformation, loading: false });
  }

  render() {
    const { loading, information } = this.state;

    return (
      <>
        <Header />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div data-testid="page-profile">
            <Link to="/profile/edit">Profile Edit</Link>
            <img
              src={ information.image }
              data-testid="profile-image"
              alt="Profile Image"
            />
            <p>{information.name}</p>
            <p>{information.email}</p>
            <p>{information.description}</p>
          </div>
        )}
      </>
    );
  }
}

export default Profile;
