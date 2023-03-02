import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getCompany } from '../graphql/queries'

getCompany('pVbRRBQtMVw6lUAkj1k43')

function CompanyDetail() {
  const [company, setCompany] = useState(null)
  const { companyId } = useParams()

  useEffect(() => {
    getCompany(companyId).then(setCompany)
  }, [companyId])

  console.log('[CompanyDetail] company: ', company)

  if (!company) return <p>Loading...</p>

  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>

      {/* (1) we want to display all the jobs here */}
      <h5 className='title is-5'>Jobs at {company.name}</h5>
    </div>
  )
}

export default CompanyDetail
