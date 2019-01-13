import React, { Component } from 'react'
import moment from 'moment'
import './style.css'
import { Link } from 'react-router-dom'

class Post extends Component {
  render() {
    return (
      <div>
        <section className="requestBoxCentering">
          <section className="requestBox">
            <div className="requestBoxTopBar">
              <Link to="/Profile">
                <img
                  className="requestBoxProfileImage"
                  src={this.props.profileImage}
                  alt="profile"
                />
              </Link>
              <div className="requestBoxTopBarInfo">
                <Link to="/Profile">
                  <p className="requestBoxProfileName">
                    {this.props.profileName}
                  </p>
                </Link>
                <p className="requestBoxDate">{this.props.timestamp}</p>
              </div>
            </div>
            <h4 className="requestBoxTitle">{this.props.postTitle}</h4>
            <img
              className="requestBoxImage"
              src={this.props.postImage}
              alt="request"
            />
            <p>{this.props.postBody}</p>
            <div className="requestBoxMiddleBar">
              <div className="requestBoxMiddleBarTwo">
                <Link to="/PostWithComments">
                  <i className="far fa-comment" />
                </Link>
              </div>
              <div className="requestBoxMiddleBarTwo">
                {/* create endpoint that adds this to your 
              interested posts and totals up the number 
              and displays below */}
                <a href="#">
                  <i className="fas fa-magnet" />
                </a>
              </div>
            </div>
            <div className="requestBoxBottomBar">
              <Link to="/PostWithComments" className="requestBoxBottomBarInfo">
                7 comments
              </Link>
              <Link to="/PeopleInterested" className="requestBoxBottomBarInfo">
                5 Interested
              </Link>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default Post
