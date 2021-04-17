import React from 'react';
import './SplashPage.css'

class SplashPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        playlist1Url: '',
        playlist2Url: '',
        playlist1Error: false,
        playlist2Error: false
      };
    }

    handlePlaylist1Change = event => {
      this.setState({
        playlist1Url: event.target.value
      });
    }

    handlePlaylist2Change = event => {
      this.setState({
        playlist2Url: event.target.value
      });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      console.log("handling submit");
      this.props.setPlaylists(this.state.playlist1Url, this.state.playlist2Url);
    }

    playlistsEntered = () => {
      return this.state.playlist1Url !== '' && this.state.playlist2Url !== '';
    }

    render() {
      // TODO: Handle playlists being the same
      // TODO: Handle invalid playlist being provided
      return (
        <div className="splash-page">
          <h1>Welcome to Library Linker</h1>
          <div className="playlist-enter">
            <p>Enter the URLs of two Spotify playlists to begin</p> 
            <form onSubmit={this.handleSubmit}>
                <div className={`textbox-wrapper ${this.state.playlist1Error ? "error" : ""}`}>
                  <input type="text" 
                    className="textbox"
                    value={this.state.playlist1Url} 
                    onChange={this.handlePlaylist1Change} 
                    placeholder="Playlist URL"
                  />
                </div>
                <div className={`textbox-wrapper ${this.state.playlist2Error ? "error" : ""}`}>
                  <input type="text" 
                    className="textbox"
                    value={this.state.playlist2Url} 
                    onChange={this.handlePlaylist2Change} 
                    placeholder="Playlist URL"
                  />
                </div>
                {this.playlistsEntered() 
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