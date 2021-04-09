import React from 'react';
import SplashPage from './SplashPage'
import HomePage from './HomePage';

class IndexPage extends React.Component {
    constructor(props) {
      super(props);
  
    }

    render() {
        if (false) {
          return <HomePage />;
        } else {
          return <SplashPage />;
        }
    }
}

export default IndexPage;