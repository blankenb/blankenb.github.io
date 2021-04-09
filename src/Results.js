import logo from './logo.svg';
import './Body.css';
import React from 'react';
class Results extends React.Component {
  constructor(props){
    super(props);
    this.state  = {
      simularityScore: this.props.simularityScore,
      sharedGenres: this.props.sharedGenres,
      recGenres: this.props.recGenres,
      sharedArtists: this.props.sharedArtists,
      recArtists: this.props.recArtists,
      sharedSongs: this.props.sharedSongs,
      recSongs: this.props.recSongs
    }
}
  render(){
    const {simularityScore, sharedGenres, recGenres, sharedArtists, recArtists, sharedSongs, recSongs} = this.state;
    return (
      <div>


        
        <div className="sim">
           Simularity Score: {simularityScore}%
        </div>



        <div className="genres">
          <div className="sharedGenres"><b>Shared Genres</b><br/> {sharedGenres.join(', ')}</div>
          <div className="recGenres"><b>Reccomended Genres</b><br/> {recGenres.join(', ')}</div>
        </div>



        <div className="artists">
          <div className="sharedArtists"><b>Shared Artists</b><br/> {sharedArtists.join(', ')}</div>
        </div>



        <div className="songs">
          <div className="sharedSongs"><b>Shared Songs</b><br/> {sharedSongs.join(', ')}</div>
          <div className="recSongs"><b>Recommended Songs</b><br/> {recSongs.join(', ')}</div>
        </div>



      </div>
    );
  }
}
export default Results;

