import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getCompany } from '../graphql/queries'

getCompany('pVbRRBQtMVw6lUAkj1k43')

function CompanyDetail() {
  // (5)
  const [company, setCompany] = useState(null)
  const { companyId } = useParams()

  // (6)
  useEffect(() => {
    getCompany(companyId).then(setCompany)
  }, [companyId])

  console.log('[CompanyDetail] company: ', company)

  // (7) must have this line > because at the beginning, company === null > company.name === error
  if (!company) return <p>Loading...</p>

  return (
    <div>
      <h1 className='title'>{company.name}</h1>
      <div className='box'>{company.description}</div>
    </div>
  )
}

export default CompanyDetail
