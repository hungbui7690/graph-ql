import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { getJob } from '../graphql/queries'

function JobDetail() {
  const { jobId } = useParams()

  // (2)
  const [job, setJob] = useState(null)

  // (3)
  useEffect(() => {
    getJob(jobId).then(setJob)
  }, [jobId])

  console.log('[JobDetail] job: ', job)

  if (!job) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1 className='title'>{job.title}</h1>
      <h2 className='subtitle'>
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className='box'>{job.description}</div>
    </div>
  )
}

export default JobDetail
