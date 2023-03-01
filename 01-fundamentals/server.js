/*
  - create package.json (manually)
  - npm i apollo-server graphql
  - install extension
*/

import { gql } from 'apollo-server'

// gql function verifies the graphql syntax
const typeDefs = gql`
  type Query {
    greeting: String
  }
`

console.log(typeDefs)
