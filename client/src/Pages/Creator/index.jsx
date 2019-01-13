import React, { Component } from 'react'
import Footer from '../../Components/Footer'
import CreatorImage from '../../assets/IMG_0327.jpg'
import './style.css'

class Creator extends Component {
  render() {
    return (
      <div>
        <div className="creator">
          {/* go to previous page arrow */}
          <i className="fas fa-arrow-left" />
          <h1 className="creator">Shea Parrott</h1>
        </div>
        <img className="creator" src={CreatorImage} alt="Shea" />
        <h4 className="creatorInfo">(904) 629-8670</h4>
        <h4 className="creatorInfo">
          <br />
          alexandergotthis@gmail.com
        </h4>
        <h3 className="creatorInfo">GitHub:</h3>
        <a href="https://github.com/SheaParrott" rel="noopener">
          <h4 className="creatorInfo">github.com/SheaParrott</h4>
        </a>
        <h3 className="creatorInfo">LinkedIn: </h3>
        <a href="https://www.linkedin.com/in/shea-parrott/" rel="noopener">
          <h4 className="creatorInfo">linkedin.com/in/shea-parrott/</h4>
        </a>
        <a
          className="serif"
          href="https://docs.google.com/document/d/1Z1NtGepxXQ0KSNtZz0EUiudEEIBaKcgVpIWB3Awpvl0/edit?usp=sharing"
        >
          <br />
          <strong>Resume</strong>
        </a>
      </div>
    )
  }
}

export default Creator
