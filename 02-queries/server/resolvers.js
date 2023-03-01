export const resolvers = {
  Query: {
    jobs: () => [
      {
        id: 'id1',
        title: 'Title1',
        description: 'Description1',
      },
      {
        id: 'id2',
        title: 'Title2',
      },
    ],
  },
}
