const authors = [
  { name: 'Chase', username: 'chase' },
  { name: 'Sean', username: 'sean' }
];

const tweets = [];

export const context = ({ req }) => {
  // Just for demonstration purposes, this is horrible practice generally
  const token = req.headers.authorization?.split(' ')[1];

  return { user: authors.find((author) => author.username === token) };
};

export const resolvers = {
  Query: {
    tweets: (parent, args, context, info) => tweets,
    author: (parent, args, context, info) => {
      if (args.name) {
        return authors.find((author) => author.username === args.name);
      } else {
        return context.user;
      }
    }
  },
  Mutation: {
    tweet: (_, { message }, context) => {
      const now = new Date().toString();
      const result = {
        message,
        id: now,
        date: now,
        author: context.user
      };
      tweets.unshift(result);
      return result;
    },
    login: (_, { username }) => {
      const author = authors.find((author) => author.username === username);
      return author && author.username;
    }
  }
};
