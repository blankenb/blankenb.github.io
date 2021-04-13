import React from 'react';
import './HomePage.css';

import Sidebar from './Sidebar';
import Results from './Results';

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      const { accessToken, playlist1, playlist2 } = this.props; // TODO: Change to playlists
      
      // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAGal7mnvIYFX8h_IpWCUp9F2U3Id3vGWYnQN_eEINooQZknDCdX8sCpCYmJrnOkFw8C0EeIG4MFnGCGZ8"

      // this.state = {
      //   next1: `https://api.spotify.com/v1/users/${playlist1}/playlists?limit=50`,
      //   playlist1: {
      //     items: []
      //   },
      //   next2: `https://api.spotify.com/v1/users/${playlist2}/playlists?limit=50`,
      //   playlist2: {
      //     items: []
      //   },
      // };
    }

    fetchPlaylistTracks(nextKey, playlistsKey, updateObject) {
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

    fetchPlaylist(playlistKey) {
      // TODO: Support urls and not just ids
      const playlistUrl = `https://api.spotify.com/v1/playlists/${this.props[playlistKey]}?fields=id%2Cname%2Cowner%2Cimages`
      // fetch(playlistUrl, {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //     'Authorization': 'Bearer ' + this.props.accessToken
      //   }
      // })
      // .then((res) => res.json())
      // .then(
      //   (res) => {

      //     // let playlists = res.items.map((playlist) => {
      //     //   return {
      //     //     id: playlist.id,
      //     //     name: playlist.name
      //     //   }
      //     // });

      //     updateObject[nextKey] = res.next;
      //     updateObject[playlistsKey].items = updateObject[playlistsKey].items.concat(res.items);
      //     this.fetchPlaylists(nextKey, playlistsKey, updateObject);
      //   },
      //   (err) => {
      //     console.log(err);
      //     // TODO: Handle
      //   }
      // );
    }

    // fetchPlaylists(nextKey, playlistsKey, updateObject) {
    //   if (updateObject === null) {
    //     console.log("Building new updateobject for " + nextKey + " " + playlistsKey);
    //     updateObject = {};
    //     updateObject[nextKey] = this.state[nextKey];
    //     updateObject[playlistsKey] = this.state[playlistsKey];
    //   }

    //   if (updateObject[nextKey] === null) {
    //     console.log("FETCHING no more playlists for " + nextKey + " " + playlistsKey);
    //     this.setState(updateObject);
    //     return;
    //   }
    //   console.log("FETCHING playlists for " + nextKey + " " + playlistsKey);

    //   fetch(updateObject[nextKey], {
    //     method: 'GET',
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //       'Authorization': 'Bearer ' + this.props.accessToken
    //     }
    //   })
    //   .then((res) => res.json())
    //   .then(
    //     (res) => {

    //       // let playlists = res.items.map((playlist) => {
    //       //   return {
    //       //     id: playlist.id,
    //       //     name: playlist.name
    //       //   }
    //       // });

    //       updateObject[nextKey] = res.next;
    //       updateObject[playlistsKey].items = updateObject[playlistsKey].items.concat(res.items);
    //       this.fetchPlaylists(nextKey, playlistsKey, updateObject);
    //     },
    //     (err) => {
    //       console.log(err);
    //       // TODO: Handle
    //     }
    //   );
    // }

    componentDidMount() {
      console.log("fetching playlists");
      // this.fetchPlaylists("next1", "playlists1", null);
      // this.fetchPlaylists("next2", "playlists2", null);
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
          <Sidebar player1="Study Mix" player2="Vibe Mix" />
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