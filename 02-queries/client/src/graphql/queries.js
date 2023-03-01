import { request, gql } from 'graphql-request'

const GRAPHQL_URL = 'http://localhost:9000/graphql'

// (1) go to JobDetail.js
export async function getJob(id) {
  const query = gql`
    query ($id: ID!) {
      job(id: $id) {
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `

  // if we hover on request() below, we will see that the 3rd params is variables
  const variables = { id }
  const { job } = await request(GRAPHQL_URL, query, variables)
  return job
}

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

  const { jobs } = await request(GRAPHQL_URL, query)
  return jobs
}
