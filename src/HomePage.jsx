import React from 'react';
import './HomePage.css';

import Sidebar from './Sidebar';
import Results from './Results';

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      const { accessToken, playlist1, playlist2 } = this.props;
      
      // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAGal7mnvIYFX8h_IpWCUp9F2U3Id3vGWYnQN_eEINooQZknDCdX8sCpCYmJrnOkFw8C0EeIG4MFnGCGZ8"

      this.state = {
        next1: `https://api.spotify.com/v1/playlists/${playlist1.id}/tracks?fields=next%2Citems(track(name%2Cid%2Cartists%2Cexternal_urls%2Cpreview_url))&limit=100`,
        playlist1Tracks: {
          items: []
        },
        next2: `https://api.spotify.com/v1/playlists/${playlist2.id}/tracks?fields=next%2Citems(track(name%2Cid%2Cartists%2Cexternal_urls%2Cpreview_url))&limit=100`,
        playlist2Tracks: {
          items: []
        },
      };
    }

    fetchPlaylistTracks(nextKey, playlistKey, updateObject) {
      if (updateObject === null) {
        console.log("Building new updateobject for " + nextKey + " " + playlistKey);
        updateObject = {};
        updateObject[nextKey] = this.state[nextKey];
        updateObject[playlistKey] = this.state[playlistKey];
      }

      if (updateObject[nextKey] === null) {
        console.log("FETCHING no more playlists for " + nextKey + " " + playlistKey);
        this.setState(updateObject);

        this.formatData(playlistKey);
        return;
      }

      console.log("FETCHING playlists for " + nextKey + " " + playlistKey);
      console.log(updateObject);

      fetch(updateObject[nextKey], {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.props.accessToken
        }
      })
      .then((res) => res.json())
      .then(
        (res) => {
          // console.log("Fetched for " + playlistKey);
          // console.log(res);

          updateObject[nextKey] = res.next;
          updateObject[playlistKey].items = updateObject[playlistKey].items.concat(res.items);
          this.fetchPlaylistTracks(nextKey, playlistKey, updateObject);
        }
      )
      .catch(
        (err) => {
          console.log(err);
          // TODO: Handle
        }
      );
    }

    formatData(playlistKey) {
      console.log("Setting artists for " + playlistKey);

      let artists = {}

      for (const track of this.state[playlistKey].items) {
        for (const artist of track.track.artists) {
          if (artists.hasOwnProperty(artist.id)) {
            artists[artist.id].count += 1;
          } else {
            artists[artist.id] = {
              name: artist.name,
              count: 1
            };
          }
        }
      }
      let updateObject = {};
      updateObject[playlistKey] = this.state[playlistKey];
      updateObject[playlistKey]['artists'] = artists;

      this.setState(updateObject);

      console.log(this.state);
    }

    componentDidMount() {
      console.log("fetching playlists");
      this.fetchPlaylistTracks('next1', 'playlist1Tracks', null);
      this.fetchPlaylistTracks('next2', 'playlist2Tracks', null);
    }

    render(){
      var simularityScore = 69.420
      var sharedGenres = ["Hip-Hop", "Jazz", "Funk", "Soul", "R&B"]
      var recGenres = ["Rock", "Pop"]
      var sharedArtists = ["Kendrick Lamar", "Kanye West"]
      var recArtists = ["Chief Keef", "Kanye East"]
      var sharedSongs = ["Kendrick Lamar - Alright", "Kanye West - Ni**as in Paris", "Smash Mouth - All Star", "Outkast - Hey Ya!", "Earth, Wind & Fire - September"]
      var recSongs = ["Chief Keef - Love Sosa", "Chief Keef - Hate Bein' Sober" , "Chief Keef - Faneto", "Chief Keef - I Don't Like", "Chief Keef - Semi On Em"]
      return (
        <div className="home-page">
          <Sidebar playlist1={this.props.playlist1}
                   playlist2={this.props.playlist2}
                   setPlaylists={this.props.setPlaylists}/>
          <Results simularityScore={simularityScore}
                   sharedGenres={sharedGenres}
                   recGenres={recGenres}
                   sharedArtists={sharedArtists}
                   recArtists={recArtists}
                   sharedSongs={sharedSongs}
                   recSongs={recSongs}/>
        </div>
      );
    }
}

export default HomePage;