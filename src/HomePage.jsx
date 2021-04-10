import React from 'react';

import Users from './Users';
import Results from './Results';
import './HomePage.css';

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      // this.props = {username1, username2, accessToken}
      // fetch "https://api.spotify.com/v1/users/{username1}/playlists?limit=50"
      
      // { .... 
      //   next: "https://api.spotify.com/v1/users/{username1}/playlists?offset=50&limit=50"
      // }

      // { .... 
      //   next: null
      // }

      const { accessToken, username1, username2 } = this.props; // TODO: Change to playlists
      
      // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAGal7mnvIYFX8h_IpWCUp9F2U3Id3vGWYnQN_eEINooQZknDCdX8sCpCYmJrnOkFw8C0EeIG4MFnGCGZ8"

      this.state = {
        next1: `https://api.spotify.com/v1/users/${username1}/playlists?limit=50`,
        playlists1: {
          items: []
        },
        next2: `https://api.spotify.com/v1/users/${username2}/playlists?limit=50`,
        playlists2: {
          items: []
        },
      };
    }

    fetchPlaylists(nextKey, playlistsKey, updateObject) {
      if (updateObject === null) {
        console.log("Building new updateobject for " + nextKey + " " + playlistsKey);
        updateObject = {};
        updateObject[nextKey] = this.state[nextKey];
        updateObject[playlistsKey] = this.state[playlistsKey];
      }

      if (updateObject[nextKey] === null) {
        console.log("FETCHING no more playlists for " + nextKey + " " + playlistsKey);
        this.setState(updateObject);
        return;
      }
      console.log("FETCHING playlists for " + nextKey + " " + playlistsKey);

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

          // let playlists = res.items.map((playlist) => {
          //   return {
          //     id: playlist.id,
          //     name: playlist.name
          //   }
          // });

          updateObject[nextKey] = res.next;
          updateObject[playlistsKey].items = updateObject[playlistsKey].items.concat(res.items);
          this.fetchPlaylists(nextKey, playlistsKey, updateObject);
        },
        (err) => {
          console.log(err);
          // TODO: Handle
        }
      );
    }

    componentDidMount() {
      console.log("fetching playlists");
      // this.fetchPlaylists("next1", "playlists1", null);
      // this.fetchPlaylists("next2", "playlists2", null);
    }

    render() {
        var simularityScore = 69.420
        var sharedGenres = ["weeb", "super weeb", "hyper weeb", "giga weeb", "metal"]
        var recGenres = ["hello", "michelle"]
        var sharedArtists = ["super weeb master 69 420"]
        var recArtists = ["weebymcweeb"]
        var sharedSongs = ["AYAYAYA", "WEEEEEEEEEEEEEEEEEEEEEEEEEEEEB"]
        var recSongs = ["ok boomer"]
        // DEBUG
        return (
          <div>
            <div>Next1: {this.state.next1}</div>
            <div>Playlists1: {JSON.stringify(this.state.playlists1.items)}</div>
            <div>Next2: {this.state.next2}</div>
            <div>Playlists2: {JSON.stringify(this.state.playlists2.items)}</div>
            <div className="flex-container">  
              <Users player1={this.props.username1} player2={this.props.username2} />
              <Results simularityScore={simularityScore}
                        sharedGenres={sharedGenres}
                        recGenres={recGenres}
                        sharedArtists={sharedArtists}
                        recArtists={recArtists}
                        sharedSongs={sharedSongs}
                        recSongs={recSongs}/>
            </div>
          </div>
        );
    }
}

export default HomePage;