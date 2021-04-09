import logo from './logo.svg';
import './Body.css';
import React from 'react';
import Users from './Users';
import Results from './Results';
class Body extends React.Component {
  render(){
    var simularityScore = 69.420
    var sharedGenres = ["weeb", "super weeb", "hyper weeb", "giga weeb", "metal"]
    var recGenres = ["fuck", "michelle"]
    var sharedArtists = ["super weeb master 69 420"]
    var recArtists = ["weebymcweeb"]
    var sharedSongs = ["AYAYAYA", "WEEEEEEEEEEEEEEEEEEEEEEEEEEEEB"]
    var recSongs = ["ok boomer"]
    return (
      <div className="flex-container">
        <Users player1="me" player2="you" />
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
export default Body;

