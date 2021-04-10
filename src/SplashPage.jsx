import React from 'react';
import TestButton from './TestButton';

class SplashPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        playlist1: '',
        playlist2: ''
      };
    }

    handlePlaylist1Change = event => {
      this.setState({
        playlist1: event.target.value
      });
    }

    handlePlaylist2Change = event => {
      this.setState({
        playlist2: event.target.value
      });
    }

    handleSubmit = () => {
      console.log("handling submit");
      this.props.setPlaylists(this.state.playlist1, this.state.playlist2);
    }

    render() {
      // TODO: Handle playlists being the same
      // TODO: Handle invalid playlist being provided
      return (
        <div class="banner">
          <div class="content">
              <h1>Welcome to Library Linker</h1> 
              <p>Enter URLs to two Spotify playlists below to begin.</p> 
            <form onSubmit={this.handleSubmit}>
                <input type="text" 
                  class="textbox"
                  value={this.state.playlist1} 
                  onChange={this.handlePlaylist1Change} 
                  placeholder="Playlist URL"
                />
                <input type="text" 
                  class="textbox"
                  value={this.state.playlist2} 
                  onChange={this.handlePlaylist2Change} 
                  placeholder="Playlist URL"
                />
                <button type="submit" class="splash_button">Find Shared Tastes</button>
            </form>
          </div>
        </div>
      )
    }
}

export default SplashPage;