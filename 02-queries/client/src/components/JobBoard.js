import { useEffect, useState } from 'react'
import JobList from './JobList'
import { jobs } from '../fake-data'
import { getJobs } from '../graphql/queries'

function JobBoard() {
  const [jobs, setJobs] = useState([])

  // (1)
  const [error, setError] = useState(false)

  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((err) => setError(true)) // (2)
  }, [])

  console.log(`[JobBoard] jobs: `, jobs)

  // (3)
  if (error) return <p>Sorry, something went wrong</p>

  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  )
}

export default JobBoard
