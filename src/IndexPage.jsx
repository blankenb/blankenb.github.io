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
        username1: '',
        username2: ''
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

    setUsernames = (username1, username2) => {
      this.setState({
        username1: username1,
        username2: username2
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
        if (this.state.username1 !== '' && this.state.username2 !== '') {
          // DEBUG
          return (
            <div>
              <p>DEBUG2: {this.state.accessToken}</p>
              <HomePage accessToken={this.state.accessToken} username1={this.state.username1} username2={this.state.username2} />;
            </div>
          )
        } else {
          // DEBUG
          return (
            <div>
              <p>DEBUG: {this.state.accessToken}</p>
              <SplashPage setUsernames={this.setUsernames} />
            </div>
          );
        }
    }
}

export default IndexPage;