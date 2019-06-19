const { ApolloServer, gql } = require("apollo-server");
const { buildFederatedSchema } = require("@apollo/federation");

const typeDefs = gql`
  extend type Query {
    tasks: [Task]
  }

  type Task @key(fields: "id") {
    id: ID!
    label: String
    done: Boolean
  }
`;

const resolvers = {
  Query: {
    tasks() {
      return todos;
    }
  },
  Task: {
    __resolveReference(object) {
      return todos.find(task => task.id === object.id);
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

const todos = [
  {
    id: 123456,
    label: "Initially added Todo.",
    done: true
  },
  {
    id: 356479,
    label: "Another task from api server.",
    done: false
  }
];
