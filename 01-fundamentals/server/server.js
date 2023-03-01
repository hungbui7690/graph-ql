/*
  GraphQL Client: 
  - as we see in last lectures > the client sends POST request to server with the body contains data 

  (1) put the old codes in server/ 
  (2) create client/ > we will build the client to send HTTP request to server

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
