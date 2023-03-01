/*
  QUERY LANGUAGE
  - go to http://localhost:9000/ > will see the sandbox = one of GraphQL Client
  - check pictures > graphql-client

*/

import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  # this is default bts
  schema {
    query: Query
  }

  type Query {
    greeting: String
  }
`

const resolvers = {
  Query: {
    greeting: () => 'Hello World',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
const serverInfo = await server.listen({ port: 9000 })
console.log(`Server is running at ${serverInfo.url}`)
