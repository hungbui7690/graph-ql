/*
  RESOLVER FUNCTIONS
  -


*/

import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    greeting: String
  }
`

// (1) create resolvers function
// this needs to match typeDefs
// > greeting now is a function that returns String
const resolvers = {
  Query: {
    greeting: () => 'Hello World',
  },
}

// (2) create graphql server
const server = new ApolloServer({ typeDefs, resolvers })
const serverInfo = await server.listen({ port: 9000 })
console.log(`Server is running at ${serverInfo.url}`)
