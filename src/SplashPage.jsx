import React from 'react';
import TestButton from './TestButton';

class SplashPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        username1: '',
        username2: ''
      }
    }

    handleUsername1Change = event => {
      this.setState({
        username1: event.target.value
      })
    }

    handleUsername2Change = event => {
      this.setState({
        username2: event.target.value
      })
    }

    handleSubmit = () => {
      alert(`${this.state.username1} ${this.state.username2}`)
    }

    render() {
      return (
        <div class="banner">
          <div class="content">
              <h1>Welcome to App</h1> 
              <p>Enter two unique Spotify usernames below to begin.</p> 
            <form onSubmit={this.handleSubmit}>
              <div class="textbox">
                <input type="text" 
                  value={this.state.username1} 
                  onChange={this.handleUsername1Change} 
                  placeholder="Username"
                />
              </div>
              <div class="textbox">
                <input type="text" 
                  value={this.state.username2} 
                  onChange={this.handleUsername2Change} 
                  placeholder="Username"
                />
              </div>
              <button type="submit" class="splash_button">Find Shared Tastes</button>
            </form>
          </div>
        </div>
      )
    }
}

export default SplashPage;