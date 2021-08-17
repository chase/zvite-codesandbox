import React, { useCallback, useRef } from 'react';
import { useHomeQuery, useTweetMutation } from './graphql-types-and-hooks';
import Login from './Login';
import { logout } from './graphql';

import './App.css';
import Tweet from './Tweet';

function App() {
  const textFieldRef = useRef<HTMLTextAreaElement>(null);
  const { loading, error, data } = useHomeQuery();
  const [
    sendTweet,
    { loading: submittingTweet, data: tweetData, error: tweetError }
  ] = useTweetMutation({
    refetchQueries: ['Home']
  });
  const handleSend = useCallback(() => {
    const message = textFieldRef.current?.value;

    if (textFieldRef.current == null || !message) return;

    textFieldRef.current.value = '';
    sendTweet({
      variables: {
        message
      }
    });
  }, [textFieldRef, sendTweet]);

  const handleKeyPress: React.KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (evt) => {
      if (evt.key === 'Enter') {
        evt.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  if (error) return <code>{JSON.stringify(error)}</code>;

  if (!data?.author)
    return (
      <div className="App">
        <nav className="App-nav">
          <h2>Zvite</h2>
        </nav>
        <Login />
      </div>
    );

  return (
    <div className="App">
      <nav className="App-nav">
        <div>
          <strong>{data.author.name}</strong> <em>@{data.author.username}</em>
        </div>
        <h2>Zvite</h2>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </nav>
      <main>
        <div className="App-input">
          <textarea
            rows={2}
            maxLength={120}
            placeholder="Your thoughts go here"
            ref={textFieldRef}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend}>Send ➤</button>
        </div>
        <div className="App-tweets">
          {loading
            ? 'Loading...'
            : data.tweets.map((tweet) => <Tweet key={tweet.id} {...tweet} />)}
        </div>
      </main>
    </div>
  );
}

export default App;
