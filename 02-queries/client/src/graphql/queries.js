import { request, gql } from 'graphql-request'

const GRAPHQL_URL = 'http://localhost:9000/graphql'

// (1) go to JobBoard.js
export async function getJobs() {
  // query grabs from the Apollo Client
  const query = gql`
    {
      jobs {
        id
        title
        company {
          name
        }
      }
    }
  `

  // we can see that it is so easy when using the graphql-request package
  const data = await request(GRAPHQL_URL, query)
  console.log('data: ', data)
}
