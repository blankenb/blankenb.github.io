import React from 'react';
import './HomePage.css';

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
        <section id="similarity">
          <h3 className="statistic-name">
            Similarity:&nbsp;
            <span className="statistic-value">{simularityScore}%</span>
          </h3>
        </section>

        <section id="genres">
          <button className="menu selected">Shared Genres</button>
          <button className="menu">Recommended Genres</button>
          <ul className="statistic-value">
            {sharedGenres.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul>
        </section>

        <section id="artists">
          <button className="menu selected">Shared Artists</button>
          <button className="menu">Recommended Artists</button>
          <ul className="statistic-value">
            {sharedArtists.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul>
        </section>

        <section id="songs">
          <button className="menu selected">Shared Songs</button>
          <button className="menu">Recommended Songs</button>
          <ul className="statistic-value">
            {sharedSongs.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul>
        </section>
      </div>
    );
  }
}
export default Results;

