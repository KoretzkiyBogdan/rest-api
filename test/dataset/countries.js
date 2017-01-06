module.exports = {
  modelName: 'Countries',
  uri: 'api/countries',
  updateData: {
    name: 'test'
  },
  valid: [
    {
      id: 1,
      name: 'USA'
    },
    {
      id: 2,
      name: 'Great Britain'
    },
    {
      id: 3,
      name: 'Australia'
    },
    {
      id: 4,
      name: 'Germany'
    },
    {
      id: 5,
      name: 'France'
    }
  ],
  notValid: [
    {
      id: 'so-so',
      name: 180001212
    }
  ]
};