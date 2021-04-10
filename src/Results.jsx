import logo from './logo.svg';
import './HomePage.css';
import React from 'react';
class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      simularityScore: this.props.simularityScore,
      sharedGenres: this.props.sharedGenres,
      recGenres: this.props.recGenres,
      sharedArtists: this.props.sharedArtists,
      recArtists: this.props.recArtists,
      sharedSongs: this.props.sharedSongs,
      recSongs: this.props.recSongs
    }
  }
  render() {
    const { simularityScore, sharedGenres, recGenres, sharedArtists, recArtists, sharedSongs, recSongs } = this.state;
    return (
      <div className="stats-wrapper">
        <div className="flex-container">
          <div className="card">
            <b>Simularity Score</b><br /> <p>{simularityScore}%</p>
          </div>

          <div className="card"><b>Shared Genres</b><br /> <p>{sharedGenres.join(', ')}</p></div>
          <div className="card"><b>Reccomended Genres</b><br /> <p>{recGenres.join(', ')}</p></div>

          <div className="card"><b>Shared Artists</b><br /> <p>{sharedArtists.join(', ')}</p></div>
          <div className="card"><b>Recommended Artists</b><br /> <p>{recArtists.join(', ')}</p></div>

        </div>
        <div className="flex-container">
          <div className="song_card"><b>Shared Songs</b><br /> <p>  
            <ul>
            {sharedSongs.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul></p></div>
          <div className="song_card">
            <b>Recommended Songs</b><br /><p>  <ul>
              {recSongs.map((value, index) => {
                return <li key={index}>{value}</li>
              })}
            </ul></p>
          </div>
        </div>
      </div>
    );
  }
}
export default Results;

