// Oh, look's like we have pink floyd here :)
module.exports = {
  modelName: 'Users',
  uri: 'api/users',
  updateData: {
    firstName: 'test',
    lastName: 'test-test'
  },
  valid: [
    {
      id: 1,
      firstName: 'Roger',
      lastName: 'Wates'
    },
    {
      id: 2,
      firstName: 'David',
      lastName: 'Gilmour'
    },
    {
      id: 3,
      firstName: 'Nick',
      lastName: 'Mason'
    },
    {
      id: 4,
      firstName: 'Richard',
      lastName: 'Wright'
    },
    {
      id: 5,
      firstName: 'Syd',
      lastName: 'Barrett'
    }
  ],
  notValid: [
    {
      id: 'dfdfdfg1',
      firstName: null,
      lastName: 18
    }
  ]
};