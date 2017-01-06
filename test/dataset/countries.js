/**
 * Data Set from "Contries" model 
 */
module.exports = {
  // Used when need create records in DB
  modelName: 'Countries',
  // Used when need fetch records throught API
  uri: 'api/countries',
  // Used in test cases which updating existing resources throught API
  updateData: {
    name: 'test'
  },
  // Used in test cases which create/receive records from API and in "before/after" hooks
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
  // Used in test cases which expect receive error from API
  notValid: [
    {
      id: 'so-so',
      name: 180001212
    }
  ]
};