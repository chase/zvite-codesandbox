import React from 'react';
import type { TweetFieldsFragment as ITweet } from './graphql-types-and-hooks';
import relativeDate from './relativeDate';

import './Tweet.css';

function Tweet({ date, author, message }: ITweet) {
  return (
    <div className="Tweet">
      <div className="Tweet-header">
        <div className="Tweet-author">
          <strong>{author.name}</strong> <em>@{author.username}</em>
        </div>
        <div className="Tweet-date">{relativeDate(date)}</div>
      </div>
      <div className="Tweet-message">{message}</div>
    </div>
  );
}

export default React.memo(Tweet);
