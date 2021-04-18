import React from 'react';
import './HomePage.css';

import Sidebar from './Sidebar';
import Results from './Results';

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      const { playlist1, playlist2 } = this.props;
      
      // -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQAGal7mnvIYFX8h_IpWCUp9F2U3Id3vGWYnQN_eEINooQZknDCdX8sCpCYmJrnOkFw8C0EeIG4MFnGCGZ8"

      this.state = {
        next1: `https://api.spotify.com/v1/playlists/${playlist1.id}/tracks?fields=next%2Citems(track(name%2Cid%2Cartists%2Cexternal_urls%2Cpreview_url%2Calbum(images)))&limit=100`,
        playlist1Data: {
          // raw
          items: [],

          // maps
          songs: {},    // { id: { name, artistNames, url } }
          artists: {},  // { id: { name, url, count } }
          genres: {},   // { name: count }

          // sets of ids of maps
          songSet: null,
          artistSet: null,
          genreSet: null
        },
        next2: `https://api.spotify.com/v1/playlists/${playlist2.id}/tracks?fields=next%2Citems(track(name%2Cid%2Cartists%2Cexternal_urls%2Cpreview_url%2Calbum(images)))&limit=100`,
        playlist2Data: {
          items: [],
          songs: {},
          artists: {},
          genres: {},
          songSet: null,
          artistSet: null,
          genreSet: null
        }
      };
    }

    fetchPlaylistTracks = (nextKey, playlistKey, updateObject) => {
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

    formatData = (playlistKey) => {
      let updateObject = {};
      updateObject[playlistKey] = this.state[playlistKey];

      console.log("Setting songs for " + playlistKey);
      let songs = {};
      for (const track of this.state[playlistKey].items) {
        if (!songs.hasOwnProperty(track.track.id)) {
          songs[track.track.id] = {
            name: track.track.name,
            artistNames: track.track.artists.map(artist => artist.name),
            url: track.track.external_urls.spotify
          }
        }
      }
      updateObject[playlistKey]['songs'] = songs;
      updateObject[playlistKey]['songSet'] = new Set(Object.keys(songs));

      console.log("Setting artists for " + playlistKey);
      let artists = {};
      for (const track of this.state[playlistKey].items) {
        for (const artist of track.track.artists) {
          if (artists.hasOwnProperty(artist.id)) {
            artists[artist.id].count += 1;
          } else {
            artists[artist.id] = {
              name: artist.name,
              url: artist.external_urls.spotify,
              count: 1
            };
          }
        }
      }
      updateObject[playlistKey]['artists'] = artists;
      updateObject[playlistKey]['artistSet'] = new Set(Object.keys(artists));

      console.log("Setting genres for " + playlistKey);
      let genres = {};
      // TODO: Get artist image
      let artistIds = Object.keys(artists).slice(0, 50).join("%2C"); // TODO: Use all artists not just first 50
      fetch(`https://api.spotify.com/v1/artists?ids=${artistIds}`, {
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
          for (const artist of res.artists) {
            for (const genre of artist.genres) {
              if (genres.hasOwnProperty(genre)) {
                genres[genre] += 1;
              } else {
                genres[genre] = 1;
              }
            }
          }

          updateObject[playlistKey]['genres'] = genres;
          updateObject[playlistKey]['genreSet'] = new Set(Object.keys(genres));

          this.setState(updateObject);
    
          console.log(this.state);
        }
      )
      .catch(
        (err) => {
          console.log(err);
          // TODO: Handle
        }
      );
    }

    getGenreIntersection = () => {
      if (this.state.playlist1Data.genreSet === null || this.state.playlist2Data.genreSet === null) {
        return [];
      } else {
        return Array.from(new Set(
          [...this.state.playlist1Data.genreSet]
          .filter(x => this.state.playlist2Data.genreSet.has(x))
        ))
        .sort((a, b) => {
          let aCount = this.state.playlist1Data.genres[a] + this.state.playlist2Data.genres[a];
          let bCount = this.state.playlist1Data.genres[b] + this.state.playlist2Data.genres[b];
          return bCount - aCount;
        })
        .map(name => {
          return {
            name: name,
            p1Count: this.state.playlist1Data.genres[name],
            p2Count: this.state.playlist2Data.genres[name]
          }
        });
      }
    }

    getArtistIntersection = () => {
      if (this.state.playlist1Data.artistSet === null || this.state.playlist2Data.artistSet === null) {
        return [];
      } else {
        return Array.from(new Set(
          [...this.state.playlist1Data.artistSet]
          .filter(x => this.state.playlist2Data.artistSet.has(x))
        ))
        .sort((a, b) => {
          let aCount = this.state.playlist1Data.artists[a].count + this.state.playlist2Data.artists[a].count;
          let bCount = this.state.playlist1Data.artists[b].count + this.state.playlist2Data.artists[b].count;
          return bCount - aCount;
        })
        .map(id => {
          return {
            name: this.state.playlist1Data.artists[id].name,
            url: this.state.playlist1Data.artists[id].url,
            p1Count: this.state.playlist1Data.artists[id].count,
            p2Count: this.state.playlist2Data.artists[id].count
          }
        });
      }
    }

    getSongIntersection = () => {
      if (this.state.playlist1Data.songSet === null || this.state.playlist2Data.songSet === null) {
        return [];
      } else {
        return Array.from(new Set(
          [...this.state.playlist1Data.songSet]
          .filter(x => this.state.playlist2Data.songSet.has(x))
        ))
        .map(id => this.state.playlist1Data.songs[id]);
      }
    }

    generateSources = () => {
      return {
        shared: {
          genres: this.getGenreIntersection(),
          artists: this.getArtistIntersection(),
          songs: this.getSongIntersection()
        },
        p1: { // todo
          genres: [],
          artists: [],
          songs: []
        },
        p2: { // todo
          genres: [],
          artists: [],
          songs: []
        }
      }
    }

    componentDidMount = () => {
      console.log("fetching playlists");
      this.fetchPlaylistTracks('next1', 'playlist1Data', null);
      this.fetchPlaylistTracks('next2', 'playlist2Data', null);
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
          <Results playlist1={this.props.playlist1}
                   playlist2={this.props.playlist2}
                   playlist1Data={this.state.playlist1Data}
                   playlist2Data={this.state.playlist2Data}
                   simularityScore={simularityScore}
                   sources={this.generateSources()} />
        </div>
      );
    }
}

export default HomePage;