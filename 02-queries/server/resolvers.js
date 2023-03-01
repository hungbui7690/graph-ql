import { Company, Job } from './db.js'

export const resolvers = {
  Query: {
    // 1st arg is always the parent === Query === root
    // test in Apollo Client
    job: (root, args) => {
      console.log('args: ', args)
    },
    jobs: () => Job.findAll(),
  },

  Job: {
    company: (job) => {
      return Company.findById(job.companyId)
    },
  },
}
