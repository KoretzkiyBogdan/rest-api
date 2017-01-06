module.exports = {
  modelName: 'Customers',
  uri: 'api/customers',
  updateData: {
    firstName: 'test',
    lastName: 'test-test',
    position: 'test'
  },
  valid: [
    {
      id: 1,
      firstName: 'Annie',
      lastName: 'Hall',
      position: 'sales'
    },
    {
      id: 2,
      firstName: 'David',
      lastName: 'Johnson',
      position: 'development'
    },
    {
      id: 3,
      firstName: 'Julia',
      lastName: 'Summers',
      position: 'sales'
    },
    {
      id: 4,
      firstName: 'John',
      lastName: 'Simon',
      position: 'marketing'
    },
    {
      id: 5,
      firstName: 'Alex',
      lastName: 'Wright',
      position: 'call-centre'
    }
  ],
  notValid: [
    {
      id: 'ererdfd1',
      firstName: 134343,
      lastName: 'dfdfdfdf',
      position: undefined
    }
  ]
};