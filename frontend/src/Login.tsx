import React, { useCallback, useEffect, useRef, useState } from 'react';
import { authenticate } from './graphql';
import { useLoginMutation } from './graphql-types-and-hooks';
import './Login.css';

function Login() {
  const userInput = useRef<HTMLInputElement>(null);
  const [login, { data, error, loading }] = useLoginMutation({
    fetchPolicy: 'network-only'
  });
  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      if (!userInput.current?.value) return;

      const username = userInput.current.value;
      login({
        variables: { username }
      });
    },
    [userInput, login]
  );

  useEffect(() => {
    if (data?.login != null) {
      authenticate(data.login);
    }
  }, [data]);

  return (
    <div className="Login">
      <h1>Who are you, exactly?</h1>
      <form onSubmit={handleSubmit}>
        <div className={data != null && data.login == null ? 'Error' : ''}>
          <label>
            Username: <input ref={userInput} />
            {data != null && data.login == null && (
              <div>I'm afraid you don't exist.</div>
            )}
          </label>
        </div>
        <button
          type="submit"
          style={{ width: '100%', cursor: 'pointer' }}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
export default Login;
