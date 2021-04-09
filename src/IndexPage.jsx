import React from 'react';

import { CLIENT_AUTH_FIELD } from './auth';
import SplashPage from './SplashPage'
import HomePage from './HomePage';

class IndexPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        accessToken: null,
        validUntil: null,
        fetchedPlaylists: false,
        userPlaylists: [],
        otherPlaylists: []
      };

      // this.blah = this.blah.bind(this);
    }

    // blah(newState) {
    //   this.setState(newState);
    // }

    getAuthToken = () => {
      fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + CLIENT_AUTH_FIELD
        },
        body: 'grant_type=client_credentials'
      })
      .then((res) => res.json())
      .then(
        (res) => {
          const validUntil = new Date();
          validUntil.setSeconds(validUntil.getSeconds() + res.expires_in - 60)
          const spotifyAuth = {
            accessToken: res.access_token,
            validUntil: validUntil.getTime()
          } // Needs to match fields in state
    
          localStorage.setItem('spotifyAccessToken', spotifyAuth.accessToken);
          localStorage.setItem('spotifyValidUntil', spotifyAuth.validUntil);
          this.setState(spotifyAuth);
        },
        (err) => console.log(err)
      )
    }

    componentDidMount() {
      if (localStorage.getItem('spotifyAccessToken') === null ||
          Number(localStorage.getItem('spotifyValidUntil')) <= Date.now()) {
        console.log("authorizing");
        this.getAuthToken();
      } else {
        this.setState({
          accessToken: localStorage.getItem('spotifyAccessToken'),
          validUntil: localStorage.getItem('spotifyValidUntil')
        });
      }
    }

    render() {
        if (this.state.fetchedPlaylists) {
          return <HomePage />;
        } else {
          // DEBUG
          return (
            <div>
              <p>DEBUG: {this.state.accessToken}</p>
              <SplashPage />
            </div>
          );
        }
    }
}

export default IndexPage;