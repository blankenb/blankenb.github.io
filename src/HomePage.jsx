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

      const { accessToken, username1, username2 } = this.props;
      
      // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAGal7mnvIYFX8h_IpWCUp9F2U3Id3vGWYnQN_eEINooQZknDCdX8sCpCYmJrnOkFw8C0EeIG4MFnGCGZ8"

      this.state = {
        next1: `https://api.spotify.com/v1/users/${username1}/playlists?limit=50`,
        playlists1: {},
        next2: `https://api.spotify.com/v1/users/${username2}/playlists?limit=50`,
        playlists2: {},
      };
    }

    // fetchPlaylists(nextKey, playlistsKey)

    // fetchData() {
    //   while next1 isn't null:
    //     load playlists1

    //   while next2 isn't null:
    //     load playlists2

    //   fetch(this.state.next1)
    //     .then((res) => res.json())
    //     .then(
    //       (res) => {
          
    //       },
    //       (err) => console.log(err)
    //     );
    // }

    render() {
        var simularityScore = 69.420
        var sharedGenres = ["weeb", "super weeb", "hyper weeb", "giga weeb", "metal"]
        var recGenres = ["hello", "michelle"]
        var sharedArtists = ["super weeb master 69 420"]
        var recArtists = ["weebymcweeb"]
        var sharedSongs = ["AYAYAYA", "WEEEEEEEEEEEEEEEEEEEEEEEEEEEEB"]
        var recSongs = ["ok boomer"]
        return (
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
        );
    }
}

export default HomePage;