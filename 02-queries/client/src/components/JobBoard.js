import JobList from './JobList'
import { jobs } from '../fake-data'

// (2)
import { getJobs } from '../graphql/queries'

// (3)
getJobs()

function JobBoard() {
  return (
    <div>
      <h1 className='title'>Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  )
}

export default JobBoard
