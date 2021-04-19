import React from 'react';
import './SplashPage.css'

class SplashPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        playlist1Url: '',
        playlist2Url: '',
        playlist1Error: null,
        playlist2Error: null,
        playlist1: null,
        playlist2: null
      };
    }

    handlePlaylist1Change = event => {
      this.setState({
        playlist1Url: event.target.value,
        playlist1Error: null
      });
    }

    handlePlaylist2Change = event => {
      this.setState({
        playlist2Url: event.target.value,
        playlist2Error: null
      });
    }

    enableSubmit = () => {
      return this.state.playlist1Url !== '' && this.state.playlist2Url !== '' &&
             this.state.playlist1Error === null && this.state.playlist2Error == null;
    }

    fetchPlaylist(playlistUrl, playlistKey) {
      let re = /playlist\/(?<playlist_id>\w+)/;
      let match = playlistUrl.match(re);

      if (match === null) {
        console.log("error parsing playlist");
        let updateObject = {};
        updateObject[playlistKey + 'Error'] = 'Not a valid playlist URL';
        this.setState(updateObject);
        return;
      }
      console.log("id: " + match.groups.playlist_id);

      const apiUrl = `https://api.spotify.com/v1/playlists/${match.groups.playlist_id}?fields=id%2Cname%2Cowner%2Cimages`

      this.props.refreshTokenIfNecessary();
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.accessToken
        }
      })
      .then((res) => { 
        if (!res.ok) {
          throw new Error('404');
        }

        return res.json(); 
      })
      .then(
        (res) => {
          console.log(res);

          let updateObject = {};
          updateObject[playlistKey] = res;
          this.setState(updateObject);

          if (this.state.playlist1 !== null && this.state.playlist2 !== null) {
            this.props.setPlaylists(this.state.playlist1, this.state.playlist2);
          }
        }
      )
      .catch(
        (err) => {
          console.log(err);

          let updateObject = {};
          updateObject[playlistKey + 'Error'] = err.message == '404' ? 
            'Playlist not found' : 'Unknown error occurred'; 
          this.setState(updateObject);
        }
      );
    }

    handleSubmit = (event) => {
      event.preventDefault();
      console.log("handling submit");

      this.setState({
        playlist1: null,
        playlist2: null
      });

      this.fetchPlaylist(this.state.playlist1Url, 'playlist1');
      this.fetchPlaylist(this.state.playlist2Url, 'playlist2');
      // this.props.setPlaylists(this.state.playlist1Url, this.state.playlist2Url);
    }

    render() {
      // TODO: Handle playlists being the same ?
      return (
        <div className="splash-page">
          <h1>Welcome to Library Linker</h1>
          <div className="playlist-enter">
            <p>Enter the URLs of two Spotify playlists to check their similarity and discover recommendations</p> 
            <form onSubmit={this.handleSubmit}>
                <div className="textbox-wrapper">
                  <input type="text" 
                    className="textbox"
                    value={this.state.playlist1Url} 
                    onChange={this.handlePlaylist1Change} 
                    placeholder="Playlist URL"
                  />
                  {this.state.playlist1Error !== null &&
                    <span className="error">{this.state.playlist1Error}</span>
                  }
                </div>
                <div className="textbox-wrapper">
                  <input type="text" 
                    className="textbox"
                    value={this.state.playlist2Url} 
                    onChange={this.handlePlaylist2Change} 
                    placeholder="Playlist URL"
                  />
                  {this.state.playlist2Error !== null &&
                    <span className="error">{this.state.playlist2Error}</span>
                  }
                </div>
                {this.enableSubmit()
                  ? <button type="submit" className="pill">Find Shared Tastes</button>
                  : <button disabled type="submit" className="pill">Find Shared Tastes</button>
                }
            </form>
          </div>
        </div>
      )
    }
}

export default SplashPage;