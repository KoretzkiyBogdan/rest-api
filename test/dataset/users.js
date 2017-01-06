/**
 * Data Set from "Contries" model
 * 
 * P.S. Oh, looks like we have all members of pink floyd here :)
 */
module.exports = {
  // Used when need create records in DB
  modelName: 'Users',
  // Used when need fetch records throught API
  uri: 'api/users',
  // Used in test cases which updating existing resources throught API
  updateData: {
    firstName: 'test',
    lastName: 'test-test'
  },
  // Used in test cases which create/receive records from API and in "before/after" hooks
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