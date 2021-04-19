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
        playlist1: null,
        playlist2: null
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

    refreshTokenIfNecessary = () => {
      if (localStorage.getItem('spotifyAccessToken') === null ||
          Number(localStorage.getItem('spotifyValidUntil')) <= Date.now()) {
        console.log("authorizing");
        this.getAuthToken();
        return true;
      }
    }

    setPlaylists = (playlist1, playlist2) => {
      console.log("setting playlists");
      this.setState({
        playlist1: playlist1,
        playlist2: playlist2
      });
    }

    componentDidMount() {
      if (!this.refreshTokenIfNecessary()) {
        this.setState({
          accessToken: localStorage.getItem('spotifyAccessToken'),
          validUntil: Number(localStorage.getItem('spotifyValidUntil'))
        });
      }
    }

    render() {
      console.log(this.state.accessToken);
      if (this.state.playlist1 !== null && this.state.playlist2 !== null) {
        return (
          <HomePage accessToken={this.state.accessToken} 
                    playlist1={this.state.playlist1} 
                    playlist2={this.state.playlist2} 
                    setPlaylists={this.setPlaylists}
                    refreshTokenIfNecessary={this.refreshTokenIfNecessary} />
        )
      } else {
        return (
          <SplashPage accessToken={this.state.accessToken}
                      setPlaylists={this.setPlaylists}
                      refreshTokenIfNecessary={this.refreshTokenIfNecessary} />
        );
      }
    }
}

export default IndexPage;