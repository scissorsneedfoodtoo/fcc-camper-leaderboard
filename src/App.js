import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recentURL: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      topURL: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      recentLeaderboard: [],
      topLeaderboard: [],
      recentActive: true,
      topActive: false,
      decending: true,
    }
  } // end constructor

  handleClick(e) {
    const isInactive = e.target.className.indexOf('active') === -1
    const thisButtonKey = e.target.innerText === 'Recent' ? 'recentActive' : 'topActive'
    const otherButtonKey = e.target.innerText === 'Recent' ? 'topActive' : 'recentActive'
    const decending = this.state.decending
    const currentLeaderboard = this.state.recentActive ? this.state.recentLeaderboard : this.state.topLeaderboard
    const isCaret = e.target.innerText.length === 0 // check if user clicks empty span for caret

    if (isInactive && decending && !isCaret) { // ex: displaying recent scores in decending order and click top score
      this.setState({
        [thisButtonKey]: true,
        [otherButtonKey]: false,
        decending: true
      })
    } else if (isInactive && !decending && !isCaret) { // ex: displaying recent scores in ascending order and click top score
      // reverse whatever the current leaderboard is (in this ex, the recent
      // scores leaderboard) so that it's back to default decending order
      currentLeaderboard.reverse()

      this.setState({
        [thisButtonKey]: true,
        [otherButtonKey]: false,
        decending: true
      })
    } else if (!isInactive || isCaret) { // ex: displaying recent scores and click recent scores button again
      // reverse whatever the current leaderboard is (in this ex, the recent
      // scores leaderboard) to display it in ascending or decending order
      currentLeaderboard.reverse()

      this.setState({
        decending: this.state.decending ? false : true
      })
    }
  }

  toggleClass(isActive) {
    if(isActive) {
      return "active"
    }
  }

  toggleCaret(isActive) {
    const decending = this.state.decending
    if(isActive && decending) {
      return "fa-caret-down"
    } else if (isActive && !decending){
      return "fa-caret-up"
    }
  }

  componentDidMount() {
    // fetch the recent scores for the initial page load
    // note: need to use arrow functions below to avoid undefined error

    fetch(this.state.recentURL, {
      method: 'get'
    }).then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ recentLeaderboard: data })
    }).catch((err) => {
      console.log(err)
    })

    // also fetch top scores here, too
    fetch(this.state.topURL, {
      method: 'get'
    }).then((res) => {
      return res.json()
    }).then((data) => {
      this.setState({ topLeaderboard: data })
    }).catch((err) => {
      console.log(err)
    })
  } // end componentDidMount

  render() {
    const recent = this.state.recentActive
    const targetLeaderboard = recent ? this.state.recentLeaderboard : this.state.topLeaderboard

    return (
      <div className="App">
        <div className="content">
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
            <button className={`button recent ${this.toggleClass(this.state.recentActive)}`} onClick={(event) => this.handleClick(event)}>Recent<span className={`fa ${this.toggleCaret(this.state.recentActive)}`} /></button>
            <button className={`button top ${this.toggleClass(this.state.topActive)}`} onClick={(event) => this.handleClick(event)}>Top Score<span className={`fa ${this.toggleCaret(this.state.topActive)}`} /></button>
          </div>
          {/* end button-bar */}
          <div className="scoreboard">
            {targetLeaderboard.map(function(obj, index) {
              const points = recent ? obj.recent : obj.alltime
              return (
                <div className="score-container" key={index}>
                  <div className={`score ${index}`}>
                    <a href={`https://www.freecodecamp.org/${obj.username}`}>
                      <div className="rank">
                        <p>{index + 1}</p>
                      </div>
                      <div className="avatar">
                        <img src={obj.img} alt={`${obj.username}'s' avatar`}/>
                      </div>
                      <div className="username">
                        <p>{obj.username}</p>
                      </div>
                      <div className="points">
                        <p>{points}</p>
                      </div>
                    </a>
                  </div>
                  {index < 99 ? <hr /> : ""}
                </div>
              )
            })}
          </div>
          {/* end scoreboard */}
        </div>
        {/* end content */}
        <div className="footer" />
      </div> // end App
    );
  }
}

export default App;
