/*
  GraphQL OVER HTTP
  - Schema Pooling: picture 
  - continuously sending requests to server to see if there is any change > turn off
  - picture: request-vs-response

*/

import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
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
