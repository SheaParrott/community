import React, { Component } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import Header from '../../Components/Header'
import imageOrDefault from '../../imageOrDefault'
import axios from 'axios'
import auth from '../../auth'
import history from '../../history'
import Loading from '../../Components/Loading'

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Notifications: [],
      loading: false
    }
  }

  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      window.scrollTo(0, 0)
      axios
        .get('/api/comments', {
          headers: {
            Authorization: `Bearer ${auth.getIdToken()}`
          }
        })
        .then(response => {
          if (response.data.comments.length === 0) {
            this.setState({
              loading: true
            })
          } else {
            this.setState({
              loading: true,
              Notifications: response.data.comments
            })
          }
        })
    }
  }

  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  render() {
    if (!this.state.loading) {
      return this.renderLoading()
    }
    return (
      <div>
        <Header />
        <div className="marginFromHeader whiteBackground">
          <div className="notificationsBox columnCentering">
            {this.state.Notifications.filter(
              isAuthor => !isAuthor.is_author
            ).map((notification, index) => {
              return (
                <section
                  key={index}
                  className="notificationsBox boxShadow widthbig"
                >
                  <Link to={`/Profile/${notification.profile_id}`}>
                    <img
                      className="notificationsBoxProfileImage box-secondary"
                      src={imageOrDefault(notification.profile_image)}
                      alt="profile"
                    />
                  </Link>
                  <h5 className="notifications">
                    <Link
                      className="text-secondary"
                      to={`/Profile/${notification.profile_id}`}
                    >
                      {notification.profile_name}
                    </Link>{' '}
                    <strong className="post">commented on,</strong>{' '}
                    <Link
                      className="text-secondary"
                      to={`/PostWithComments/${notification.post_id}`}
                    >
                      {notification.post_title}
                    </Link>
                  </h5>
                </section>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Notifications
