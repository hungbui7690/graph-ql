import { Company, Job } from './db.js'

export const resolvers = {
  Query: {
    job: (_root, { id }) => Job.findById(id),
    jobs: () => Job.findAll(),

    // (2)
    company: (_root, { id }) => Company.findById(id),
  },

  Job: {
    company: (job) => Company.findById(job.companyId),
  },
}
