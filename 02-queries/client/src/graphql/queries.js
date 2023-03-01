import { request, gql } from 'graphql-request'

const GRAPHQL_URL = 'http://localhost:9000/graphql'

export async function getJobs() {
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

  // (1) JobBoard.js
  const { jobs } = await request(GRAPHQL_URL, query)
  return jobs
}
