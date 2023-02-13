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
        <div className="bg-black w-screen h-screen flex flex-col items-center fav-general">

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="profile flex flex-col items-center space-x-2" data-testid="page-profile">
              {/* <Link to="/profile/edit">Profile Edit</Link> */}
              <div
                className="w-20 h-20 rounded-full bg-white ml-auto mr-6 mb-5"
              />
              {/* <img
              src={ information.image }
              data-testid="profile-image"
              alt="Profile Image"
            /> */}
              <p className="text-white"> {` Usuário: ${information.name}`}</p>
              <p>{information.email}</p>
              <p>{information.description}</p>
            </div>
          )}

        </div>
      </>
    );
  }
}

export default Profile;
