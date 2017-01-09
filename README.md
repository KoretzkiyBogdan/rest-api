# rest-api
# how to use 
#### (Before use locally set env variables DATABASE_MIGRATION=true DATABASE_URL={yourPotgresDBLink})

  1) npm install
  
  2) npm run lint
  
  3) npm test
  
  4) npm start
  
It runs on port 3000 or 2000 (development/test) by default

For manual test created one instance of Portgres and node on Heroku. Check here (https://simple-rest-api-test.herokuapp.com)

Also, added travis CI and tuned it. Check here (https://travis-ci.org/KoretzkiyBogdan/rest-api)

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
