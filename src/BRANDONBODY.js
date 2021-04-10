import logo from './logo.svg';
import './Body.css';
import React from 'react';
import Users from './Users';
import Results from './Results';
class Body extends React.Component {
  render(){
    var simularityScore = 69.420
    var sharedGenres = ["Hip-Hop", "Jazz", "Funk", "Soul", "R&B"]
    var recGenres = ["Rock", "Pop"]
    var sharedArtists = ["Kendrick Lamar", "Kanye West"]
    var recArtists = ["Chief Keef"]
    var sharedSongs = ["Kendrick Lamar - Alright", "Kanye West - Ni**as in Paris", "Smash Mouth - All Star", "Outkast - Hey Ya!", "Earth, Wind & Fire - September"]
    var recSongs = ["Chief Keef - Love Sosa", "Chief Keef - Hate Bein' Sober" , "Chief Keef - Faneto", "Chief Keef - I Don't Like", "Chief Keef - Semi On Em"]
    return (
      <div className="superdiv">
        <div className="sidenav">
        <Users player1="Big Dick Daddy" player2="Your Friend" />
        </div>
        <div className="flex-container">
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
export default Body;

