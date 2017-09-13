import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recentURL: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      topURL: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      leaderboardArr: [],
      recentActive: true,
      topActive: false,
    }
    // this.handleClick = this.handleClick.bind(this)
  } // end constructor

  componentDidMount() {
    // fetch the recent scores for the initial page load
    // note: need to use arrow functions below to avoid undefined error
    fetch(this.state.recentURL, {
      method:'get'
    }).then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ leaderboardArr: data })
    }).catch((err) => {
      console.error(err)
    })
  } // end componentDidMount

  handleClick(e) {
    const isInactive = e.target.className.indexOf('active') === -1
    const thisKey = e.target.innerText === 'Recent' ? "recentActive" : "topActive"
    const otherKey = e.target.innerText === 'Recent' ? "topActive" : "recentActive"

    if (isInactive) {
      this.setState({
        [thisKey]: true,
        [otherKey]: false,
      })
    }
  }

  toggleClass(isActive) {
    if(isActive) {
      return "active"
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="logo">
            <a href="https://www.freecodecamp.com">
              <img src="https://res.cloudinary.com/scissorsneedfoodtoo/image/upload/q_100/v1505302849/freecodecamp_logo.svg"
              alt="FreeCodeCamp logo"/>
            </a>
          </div>
          {/* end logo */}
          <h2>Camper Leaderboard</h2>
        </div>
        {/* end App-header */}
        <div className="button-bar">
          <button className={`button recent ${this.toggleClass(this.state.recentActive)}`} onClick={(event) => this.handleClick(event)}>Recent</button>
          <button className={`button top ${this.toggleClass(this.state.topActive)}`} onClick={(event) => this.handleClick(event)}>Top Score</button>
        </div>
        {/* end button-bar */}
      </div> // end App
    );
  }
}

export default App;
