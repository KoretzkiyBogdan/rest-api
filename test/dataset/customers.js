/**
 * Data Set from "Customers" model 
 */
module.exports = {
  // Used when need create records in DB
  modelName: 'Customers',
  // Used when need fetch records throught API
  uri: 'api/customers',
  // Used in test cases which updating existing resources throught API
  updateData: {
    firstName: 'test',
    lastName: 'test-test',
    position: 'test'
  },
  // Used in test cases which create/receive records from API and in "before/after" hooks
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
  // Used in test cases which expect receive error from API
  notValid: [
    {
      id: 'ererdfd1',
      firstName: 134343,
      lastName: 'dfdfdfdf',
      position: undefined
    }
  ]
};