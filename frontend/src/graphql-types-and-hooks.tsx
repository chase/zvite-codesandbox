import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Author = {
  __typename?: 'Author';
  name: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  tweet: Tweet;
  login?: Maybe<Scalars['String']>;
};


export type MutationTweetArgs = {
  message: Scalars['String'];
};


export type MutationLoginArgs = {
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  tweets: Array<Tweet>;
  author?: Maybe<Author>;
};


export type QueryAuthorArgs = {
  name?: Maybe<Scalars['String']>;
};

export type Tweet = {
  __typename?: 'Tweet';
  id: Scalars['ID'];
  date: Scalars['String'];
  message: Scalars['String'];
  author: Author;
};

export type HomeQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeQuery = { __typename?: 'Query', author?: Maybe<{ __typename?: 'Author', name: string, username: string }>, tweets: Array<{ __typename?: 'Tweet', id: string, date: string, message: string, author: { __typename?: 'Author', name: string, username: string } }> };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: Maybe<string> };

export type TweetMutationVariables = Exact<{
  message: Scalars['String'];
}>;


export type TweetMutation = { __typename?: 'Mutation', tweet: { __typename?: 'Tweet', id: string, date: string, message: string, author: { __typename?: 'Author', name: string, username: string } } };

export type AuthorFieldsFragment = { __typename?: 'Author', name: string, username: string };

export type TweetFieldsFragment = { __typename?: 'Tweet', id: string, date: string, message: string, author: { __typename?: 'Author', name: string, username: string } };

export const AuthorFieldsFragmentDoc = gql`
    fragment AuthorFields on Author {
  name
  username
}
    `;
export const TweetFieldsFragmentDoc = gql`
    fragment TweetFields on Tweet {
  id
  date
  message
  author {
    ...AuthorFields
  }
}
    ${AuthorFieldsFragmentDoc}`;
export const HomeDocument = gql`
    query Home {
  author {
    ...AuthorFields
  }
  tweets {
    ...TweetFields
  }
}
    ${AuthorFieldsFragmentDoc}
${TweetFieldsFragmentDoc}`;

/**
 * __useHomeQuery__
 *
 * To run a query within a React component, call `useHomeQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeQuery(baseOptions?: Apollo.QueryHookOptions<HomeQuery, HomeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
      }
export function useHomeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeQuery, HomeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeQuery, HomeQueryVariables>(HomeDocument, options);
        }
export type HomeQueryHookResult = ReturnType<typeof useHomeQuery>;
export type HomeLazyQueryHookResult = ReturnType<typeof useHomeLazyQuery>;
export type HomeQueryResult = Apollo.QueryResult<HomeQuery, HomeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!) {
  login(username: $username)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const TweetDocument = gql`
    mutation Tweet($message: String!) {
  tweet(message: $message) {
    ...TweetFields
  }
}
    ${TweetFieldsFragmentDoc}`;
export type TweetMutationFn = Apollo.MutationFunction<TweetMutation, TweetMutationVariables>;

/**
 * __useTweetMutation__
 *
 * To run a mutation, you first call `useTweetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTweetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tweetMutation, { data, loading, error }] = useTweetMutation({
 *   variables: {
 *      message: // value for 'message'
 *   },
 * });
 */
export function useTweetMutation(baseOptions?: Apollo.MutationHookOptions<TweetMutation, TweetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TweetMutation, TweetMutationVariables>(TweetDocument, options);
      }
export type TweetMutationHookResult = ReturnType<typeof useTweetMutation>;
export type TweetMutationResult = Apollo.MutationResult<TweetMutation>;
export type TweetMutationOptions = Apollo.BaseMutationOptions<TweetMutation, TweetMutationVariables>;