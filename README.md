# rest-api
# how to use
  1) npm install
  
  2) npm run lint (optional)
  
  3) npm test (optional, define DATABASE_URL first)
  
  4) npm start
  
It runs on port 3000 or 2000 (development/test) by default (you can define PORT variable)

I created one instance of Portgres (for development env) on Heroku and added it to connections.js

Also, added travis CI and tuned it ( see https://travis-ci.org/KoretzkiyBogdan/rest-api )

### API:
> GET api/{resource-name} - get all records by recourse name

> GET api/{resource-name}/:id - get one record by resource name & id

> POST api/{resource-name} - create one record by resource name

> PUT api/{resource-name}/:id - update one record by resource name & id

> DELETE api/{resource-name}/:id - remove one record by resource name & id

> GET api/resources?{params} - get several resources in one request by parameters 

> (by example "api/resources?users=api/users/2&customers=api/customers")

### Available resources:
> users, countries, customers
