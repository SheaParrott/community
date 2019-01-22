import React, { Component } from 'react'
import './style.css'
import Header from '../../Components/Header'
import { Link } from 'react-router-dom'
import axios from 'axios'
import imageOrDefault from '../../imageOrDefault'
import CurrentProfileHelper from '../../currentProfileHelper'
import Post from '../../Components/Post/Post'
import auth from '../../auth'
import history from '../../history'
import Loading from '../../Components/Loading'

class PostWithComments extends Component {
  constructor(props) {
    super(props)

    this.state = {
      post: null,
      errors: []
    }
  }
  componentDidMount = () => {
    if (!auth.isAuthenticated()) {
      history.replace('/SignIn')
    } else {
      window.scrollTo(0, 0)
      this.fetchPost()
    }
  }
  renderLoading = () => {
    return (
      <div className="marginFromHeader">
        <Loading />
      </div>
    )
  }

  fetchPost = () => {
    axios
      .get(`/api/posts/${this.props.match.params.post_id}`)
      .then(response => {
        this.setState({
          post: response.data.post,
          errors: []
        })
      })
  }

  createComment = event => {
    event.preventDefault()
    let form = event.target

    const formData = new FormData(form)

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1])
    // }

    axios.post('/api/comment/create', formData).then(response => {
      if (response.data.errors) {
        this.setState({
          errors: response.data.errors
        })
      } else {
        form.reset()
        this.fetchPost()
      }
    })
  }

  render() {
    if (!this.state.post) {
      return this.renderLoading()
    }
    return (
      <div className="columnCentering">
        <Header />
        <div className="marginFromHeader">
          <Post
            is_interested={this.state.post.interested}
            onPostWithCommentsPage={true}
            id={this.props.match.params.post_id}
            fetchPost={this.fetchPost}
            onProfilePage={false}
            onPostsPage={false}
            current_profile_author={this.state.post.current_profile_author}
            profile_id={this.state.post.profile_id}
            profileName={this.state.post.profile_name}
            profileImage={this.state.post.profile_image}
            postTitle={this.state.post.title}
            postImage={this.state.post.image}
            postBody={this.state.post.body}
            timestamp={this.state.post.time}
          />
          <section className="BoxCentering widthbig whiteBackground">
            <div className="columnCentering">
              {this.state.post.comments.map(comment => {
                return (
                  <div key={comment.id} className="comment widthbig">
                    <Link
                      to={CurrentProfileHelper(
                        comment.current_profile_author,
                        comment.author_id
                      )}
                    >
                      <div className="profileImageContainer">
                        <img
                          className="commentProfileImage box-secondary"
                          src={imageOrDefault(comment.author_image)}
                          alt="profile"
                        />
                      </div>
                    </Link>
                    <div>
                      <Link
                        to={CurrentProfileHelper(
                          comment.current_profile_author,
                          comment.author_id
                        )}
                      >
                        <h6 className="comment text-secondary">
                          {comment.author_name}
                        </h6>
                      </Link>
                      <p className="comment">{comment.body}</p>
                    </div>
                  </div>
                )
              })}
              {this.state.errors.map((error, index) => {
                return (
                  <h5 className="secondary-text" key={index}>
                    {` * ${error}`}
                  </h5>
                )
              })}
              <form onSubmit={this.createComment}>
                <input
                  type="hidden"
                  name="comment[post_id]"
                  value={this.props.match.params.post_id}
                />
                <input
                  className="comment width"
                  type="text"
                  name="comment[body]"
                  placeholder="Your new comment Here"
                />
                <button type="submit" className="comment width">
                  SUBMIT
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export default PostWithComments
