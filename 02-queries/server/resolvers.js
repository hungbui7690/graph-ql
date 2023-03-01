import { Company, Job } from './db.js'

export const resolvers = {
  Query: {
    // since we don't use root param > _root
    job: (_root, { id }) => {
      return Job.findById(id)
    },
    jobs: () => Job.findAll(),
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId)
    },
  },
}
