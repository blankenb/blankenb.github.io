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
          songs: {},    // { id: { name, artistNames, url, imageUrl } }
          artists: {},  // { id: { name, url, imageUrl, count } }
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
    
    getSmallImageUrl = (images) => {
      let smallest = { height: 999999 };
      for (const image of images) {
        if (image.height < smallest.height) {
          smallest = image;
        }
      }
      return smallest.url;
    }

    getMediumImageUrl = (images) => {
      for (const image of images) {
        if (image.height >= 200 && image.height <= 400) {
          return image.url;
        }
      }
      return images[images.length - 1].url;
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
            url: track.track.external_urls.spotify,
            imageUrl: this.getSmallImageUrl(track.track.album.images)
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
              imageUrl: '',
              count: 1
            };
          }
        }
      }
      updateObject[playlistKey]['artists'] = artists;
      updateObject[playlistKey]['artistSet'] = new Set(Object.keys(artists));

      this.formatExtraData(playlistKey, updateObject, Object.keys(artists).slice(0));
    }

    // Handles genres and artist images
    formatExtraData = (playlistKey, updateObject, remainingArtists) => {
      if (remainingArtists.length === 0) {
        console.log("Finished collecting extra data for " + playlistKey);
        this.setState(updateObject);
        console.log(this.state);
        return;
      }

      console.log("Setting genres for " + playlistKey);
      let genres = {};
      
      // Spotify's API can only handle 50 at a time
      let artistIds = remainingArtists.slice(0, 50).join("%2C");
      remainingArtists = remainingArtists.slice(50);
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
          console.log(res);

          for (const artist of res.artists) {
            for (const genre of artist.genres) {
              if (genres.hasOwnProperty(genre)) {
                genres[genre] += 1;
              } else {
                genres[genre] = 1;
              }
            }

            updateObject[playlistKey]['artists'][artist.id].imageUrl = this.getMediumImageUrl(artist.images);
          }

          updateObject[playlistKey]['genres'] = genres;
          updateObject[playlistKey]['genreSet'] = new Set(Object.keys(genres));

          this.formatExtraData(playlistKey, updateObject, remainingArtists);
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
            imageUrl: this.state.playlist1Data.artists[id].imageUrl,
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
      var simularityScore = 69.420;
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