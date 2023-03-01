import { useEffect, useState } from 'react'
import JobList from './JobList'
import { jobs } from '../fake-data'
import { getJobs } from '../graphql/queries'

function JobBoard() {
  // (1) fetching data is async > we need to have initial data first
  const [jobs, setJobs] = useState([])

  // (2)
  useEffect(() => {
    // getJobs().then((jobs) => setJobs(jobs))
    getJobs().then(setJobs) // exactly the same to line above
  }, [])

  // (3)
  console.log(`[JobBoard] jobs: `, jobs)

  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  )
}

export default JobBoard
