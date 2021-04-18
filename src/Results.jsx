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
      recSongs: this.props.recSongs,
      menuSelected: 'shared'
    }
  }

  selectShared = () => {
    if (this.state.menuSelected != 'shared') {
      this.setState({ menuSelected: 'shared' });
    }
  }

  selectPlaylist1Recommended = () => {
    if (this.state.menuSelected != 'p1') {
      this.setState({ menuSelected: 'p1' });
    }
  }

  selectPlaylist2Recommended = () => {
    if (this.state.menuSelected != 'p2') {
      this.setState({ menuSelected: 'p2' });
    }
  }

  render() {
    const { simularityScore, sharedGenres, recGenres, sharedArtists, recArtists, sharedSongs, recSongs } = this.state;
    return (
      <div className="stats-wrapper">
        <section id="menu">
          <button className={`menu ${this.state.menuSelected == 'shared' ? "selected" : ""}`}
                  onClick={this.selectShared}>
            Shared
          </button>
          <button className={`menu ${this.state.menuSelected == 'p1' ? "selected" : ""}`}
                  onClick={this.selectPlaylist1Recommended}>
            Recommended for {this.props.playlist1.name}
          </button>
          <button className={`menu ${this.state.menuSelected == 'p2' ? "selected" : ""}`}
                  onClick={this.selectPlaylist2Recommended}>
            Recommended for {this.props.playlist2.name}
          </button>
        </section>

        <section id="similarity">
          <h1 className="statistic-name">
            Similarity:&nbsp;
            <span className="statistic-value">{simularityScore}%</span>
          </h1>
        </section>

        <section id="genres">
          <h2 className="section-name">Genres</h2>
          <ul className="statistic-value">
            {sharedGenres.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul>
        </section>

        <section id="artists">
          <h2 className="section-name">Artists</h2>
          <ul className="statistic-value">
            {sharedArtists.map((value, index) => {
              return <li key={index}>{value}</li>
            })}
          </ul>
        </section>

        <section id="songs">
          <h2 className="section-name">Songs</h2>
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

