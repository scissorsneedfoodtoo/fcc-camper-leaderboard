import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      recentURL: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
      topURL: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime',
      leaderboard: [],
      recentActive: true,
      topActive: false,
      decending: true,
    }
  } // end constructor

  handleClick(e) {
    const isInactive = e.target.className.indexOf('active') === -1
    const thisKey = e.target.innerText === 'Recent' ? "recentActive" : "topActive"
    const otherKey = e.target.innerText === 'Recent' ? "topActive" : "recentActive"
    const newLeaderboardURL = e.target.innerText === 'Recent' ? this.state.recentURL : this.state.topURL

    if (isInactive) {
      this.fetchLeaderboard(newLeaderboardURL)
      .then(result => this.setState({
        leaderboard: result,
        [thisKey]: true,
        [otherKey]: false,
        decending: true
      }))
    } else if (!isInactive) {
      const outputLeaderboard = this.state.leaderboard.reverse()

      this.setState({
        leaderboard: outputLeaderboard,
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

  // renderScoreboard() {
  //   const outputArr = this.state.recentActive ? this.state.recentLeaderboard : this.state.topLeaderboard
  //   const decending = this.state.decending
  //   const recent = this.state.recentActive
  //   // console.log(outputArr, decending)
  //   let output = []
  //
  //   outputArr.forEach(function(obj, index) {
  //     const rank = index + 1 // due to 0 index
  //     const score = recent ? obj.recent : obj.alltime
  //     const avatar = obj.img
  //     const username = obj.username
  //     output += "<div className='score " + rank + "'>"
  //     output += "<a href='https://www.freecodecamp.org/" + username + "'>"
  //     output += "<div className='rank'>"
  //     output += "<p>1</p></div>"
  //     output += "<div className='avatar'>"
  //     output += "<img scr='" + avatar + "' alt='" + username + "'s avatar'/></div>"
  //     output += "<div className='username'>"
  //     output += "<p>" + username + "</p></div>"
  //     output += "<div className='points'>"
  //     output += "<p>" + score + "</p></div>"
  //     output += "</a></div>"
  //     if (rank !== 100) {
  //       output += "<hr />"
  //     }
  //   })
  //
  //   return output
  // }

  fetchLeaderboard(URL) {
    return fetch(URL, {
      method: 'get'
    }).then((res) => {
      return res.json()
    }).then((data) => {
      // this.setState({ leaderboard: data })
      return data
    }).catch((err) => {
      console.log(err)
    })
  }

  componentDidMount() {
    // fetch the recent scores for the initial page load
    // note: need to use arrow functions below to avoid undefined error
    // also, need to resolve promise here with new fetchLeaderboard function
    this.fetchLeaderboard(this.state.recentURL)
    .then(result => this.setState({
      leaderboard: result
    }))
  } // end componentDidMount

  render() {
    const recent = this.state.recentActive

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
          <button className={`button recent ${this.toggleClass(this.state.recentActive)}`} onClick={(event) => this.handleClick(event)}>Recent<span className={`fa ${this.toggleCaret(this.state.recentActive)}`} /></button>
          <button className={`button top ${this.toggleClass(this.state.topActive)}`} onClick={(event) => this.handleClick(event)}>Top Score<span className={`fa ${this.toggleCaret(this.state.topActive)}`} /></button>
        </div>
        {/* end button-bar */}
        <div className="scoreboard">
          {this.state.leaderboard.map(function(obj, index) {
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
        <div className="footer" />
      </div> // end App
    );
  }
}

export default App;
