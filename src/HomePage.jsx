import React from 'react';
import logo from './logo.svg';

class HomePage extends React.Component {
    constructor(props) {
      super(props);

      const { accessToken, username1, username2 } = this.props;

      this.state = {
        playlists1: [],
        next1: '',
        playlists2: [],
        next2: ''
      };
    }

    render() {
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                Edit <code>src/App.js</code> and save to reload asdf.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                Learn React
                </a>
            </header>
            </div>
        );
    }
}

export default HomePage;