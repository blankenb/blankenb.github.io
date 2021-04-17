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
        playlist1Url: '',
        playlist2Url: '',
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

    fetchPlaylist(playlistUrl, playlistKey) {
      let re = /playlist\/(?<playlist_id>\w+)/;
      let match = playlistUrl.match(re);

      if (match === null) {
        return;
      }
      console.log("id: " + match.groups.playlist_id);

      const apiUrl = `https://api.spotify.com/v1/playlists/${match.groups.playlist_id}?fields=id%2Cname%2Cowner%2Cimages`

      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.state.accessToken
        }
      })
      .then((res) => res.json())
      .then(
        (res) => {
          let updateObject = {};
          updateObject[playlistKey] = res;
          this.setState(updateObject);
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }

    setPlaylists = (playlist1Url, playlist2Url) => {
      this.fetchPlaylist(playlist1Url, "playlist1");
      this.fetchPlaylist(playlist2Url,  "playlist2");
      // this.setState({
      //   playlist1: playlist1,
      //   playlist2: playlist2
      // });
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
      console.log(this.state.accessToken);
      if (this.state.playlist1Url !== '' && this.state.playlist2Url !== '') {
        // DEBUG
        return (
          <HomePage accessToken={this.state.accessToken} playlist1Url={this.state.playlist1Url} playlist2Url={this.state.playlist2Url} />
        )
      } else {
        // DEBUG
        return (
          <SplashPage setPlaylists={this.setPlaylists} />
        );
      }
    }
}

export default IndexPage;