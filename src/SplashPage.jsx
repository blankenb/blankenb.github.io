import React from 'react';
import TestButton from './TestButton';

class SplashPage extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        username: '',
        otherUsername: ''
      }
    }

    handleUsernameChange = event => {
      this.setState({
        username: event.target.value
      })
    }

    handleOtherUsernameChange = event => {
      this.setState({
        otherUsername: event.target.value
      })
    }

    handleSubmit = () => {
      alert(`${this.state.username} ${this.state.username2}`)
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
                  value={this.state.username} 
                  onChange={this.handleUsernameChange} 
                  placeholder="Username"
                />
              </div>
              <div class="textbox">
                <input type="text" 
                  value={this.state.otherUsername} 
                  onChange={this.handleOtherUsernameChange} 
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