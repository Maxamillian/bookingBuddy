import React, { Component } from 'react';
import Moment from 'moment';

// TripBookmarksList > Bookmark > BookmarkComments > You Are Here (BookmarkCommentsList)

var BookmarkCommentsList = function({ comments }) {

  var commentsList = comments.slice().reverse().map((comment, index) => (
    <li className="collection-item bookmark-comment grey lighten-5" key={index}>
      <div className="comment-header">
        <span className="author">{comment.buddyName}</span>
        <time className="datetime grey-text text-darken-1">
          {Moment((typeof comment.date === 'string') ? parseInt(comment.date) : comment.date).fromNow()}
        </time>
      </div>
      <div className="comment-body">
        {comment.comment}
      </div>
    </li>
  ));

  return(
    <ul className="collection">
      {commentsList}
    </ul>
  );
}

module.exports = BookmarkCommentsList;