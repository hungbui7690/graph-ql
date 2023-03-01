/*
  DATABASE RESOLVERS
  
  (1) modify resolvers.js
    > we can use async to return promise
    > check data/ > fakebase > use local json file as database > check file db.js
    > we can see that in data/jobs.json > there is "companyId" for each object 
    > but when we test, it just return 3 fields as we defined in schema 

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
