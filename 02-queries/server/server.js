/*
  OBJECT GRAPH NAVIGATION
  - now, from job, we can get company > and in company, we can also get jobs
  - though it does not make sense, but we still can do that in graphql > company -> job -> company (redundant) > but for fb, it is good, since if we check the model of facebook > we can check friends of a friend 
    > pic: test-navigation

  ERROR HANDLING
  - if we stop server, then go to client > we will see a blank list > we need to handle this 

  Client
  (1) add catch block when calling getJobs() in useEffect() in JobBoard.js

*/

import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import express from 'express'
import { expressjwt as expressJWT } from 'express-jwt'
import jwt from 'jsonwebtoken'
import { User } from './db.js'
import { readFile } from 'fs/promises'
import { resolvers } from './resolvers.js'

const PORT = 9000
const JWT_SECRET = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64')

const app = express()
app.use(
  cors(),
  express.json(),
  expressJWT({
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

const typeDefs = await readFile('./schema.graphql', 'utf-8')
const apolloServer = new ApolloServer({ typeDefs, resolvers })
await apolloServer.start()
apolloServer.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: PORT }, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`🛴 GraphQL endpoint: http://localhost:${PORT}/graphql`)
})
