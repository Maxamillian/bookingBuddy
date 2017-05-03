import React, { Component } from 'react';
import BookmarkCommentsList from './BookmarkCommentsList.jsx';

// TripBookmarksList > Bookmark > You Are Here (BookmarkComments)

class BookmarkComments extends Component {
  constructor(props) {
    super(props);
    this.bookmarkCommentChange = this.bookmarkCommentChange.bind(this);
    this.bookmarkCommentSubmit = this.bookmarkCommentSubmit.bind(this);
    this.state = {
      bookmarkCommentText: ''
    };
  }

  bookmarkCommentChange(e) {
    this.setState({
      bookmarkCommentText: e.target.value
    });
  }

  bookmarkCommentSubmit(e) {
    e.preventDefault();
    var newComment = {
      buddyName: this.props.profile.given_name,
      buddyEmail: this.props.profile.email,
      date: Date.now(),
      comment: this.state.bookmarkCommentText,
    };

    this.setState({
      bookmarkCommentText: ''
    });

    this.props.addBookmarkComment(this.props.bookmark.bookmarkID, newComment);
  }

  componentDidMount() {
    $(document).ready(function(){
      $('.collapsible').collapsible();
    });
  }

  render() {
    return (
      <ul className="collapsible" data-collapsible="accordion">
        <li>
          <div className="collapsible-header">
            <span>Comments</span>
            <i className="material-icons comments-open">keyboard_arrow_down</i>
            <i className="material-icons comments-close">keyboard_arrow_up</i>
          </div>
          <div className="collapsible-body">
            <form className="grey lighten-5" onSubmit={this.bookmarkCommentSubmit}>
              <div className="input-field comment-input">
                <textarea
                  id="comment-input"
                  className="materialize-textarea"
                  onChange={this.bookmarkCommentChange}
                  value={this.state.bookmarkCommentText}
                ></textarea>
                <label>What do you think?</label>
              </div>
              <div className="comment-submit">
                <button type="submit" className="btn orange">Add Comment</button>
              </div>
            </form>
            <BookmarkCommentsList comments={this.props.bookmark.bookmarkComments} />
          </div>
        </li>
      </ul>
    );
  }

}

export default BookmarkComments;