import { Job } from './db.js'

export const resolvers = {
  Query: {
    jobs: () => Job.findAll(),
  },

  Job: {
    company: () => {
      return {
        id: 'fake',
        name: 'Fake Inc.',
      }
    },
  },
}
