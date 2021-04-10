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
        playlist1: '',
        playlist2: ''
      };
    }

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

    setPlaylists = (playlist1, playlist2) => {
      this.setState({
        playlist1: playlist1,
        playlist2: playlist2
      });
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
        if (this.state.playlist1 !== '' && this.state.playlist2 !== '') {
          // DEBUG
          return (
            <div>
              <p>DEBUG2: {this.state.accessToken}</p>
              <HomePage accessToken={this.state.accessToken} playlist1={this.state.playlist1} playlist2={this.state.playlist2} />;
            </div>
          )
        } else {
          // DEBUG
          return (
            <div>
              <p>DEBUG: {this.state.accessToken}</p>
              <SplashPage setPlaylists={this.setPlaylists} />
            </div>
          );
        }
    }
}

export default IndexPage;