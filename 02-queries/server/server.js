/*
  APOLLO SERVER FOR EXPRESS
  - now, we need to add GRAPHQL support for our express server 
    > npm install apollo-server-express graphql


  (***)
  - we will keep our schema definitions in schema.graphql
  - we also create separated file for resolvers function
  
*/

// (1) used to read schema.graphql file > need to import from "fs/promise"
import { readFile } from 'fs/promises'

// (2)
import { ApolloServer } from 'apollo-server-express'

import cors from 'cors'
import express from 'express'
import { expressjwt } from 'express-jwt'
import jwt from 'jsonwebtoken'
import { User } from './db.js'

// (4)
import { resolvers } from './resolvers.js'

const PORT = 9000
const JWT_SECRET = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64')

const app = express()
app.use(
  cors(),
  express.json(),
  expressjwt({
    algorithms: ['HS256'],
    credentialsRequired: false,
    secret: JWT_SECRET,
  })
)

app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne((user) => user.email === email)
  if (user && user.password === password) {
    const token = jwt.sign({ sub: user.id }, JWT_SECRET)
    res.json({ token })
  } else {
    res.sendStatus(401)
  }
})

// (3) after this > create resolvers.js
const typeDefs = await readFile('./schema.graphql', 'utf-8')

// (5)
const apolloServer = new ApolloServer({ typeDefs, resolvers })

// (6) start server
await apolloServer.start()

// (7) expose graphql server as part of Express server
apolloServer.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🛴 GraphQL endpoint: http://localhost:${PORT}/graphql`)
})
