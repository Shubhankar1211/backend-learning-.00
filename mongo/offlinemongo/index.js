// some good question 
// why don't we let the user hit the database directly?
// what extra does the http server provides exactly11/



// ans of above questions
// database were are created using protocaols that browsers don't understand
// database dont hav ethe granual acess as a first class citizen . very hard to do user specific access in them
// express server has full connection or full axeccess  of database that is why we should use auth // we need server in betweem to do authentication cheack and the browser talk to the server but sever can't talk to the database 
// ther are some database(firebase) that let you get rid of the http server and try thier best to provide granula access 

// in mongoose , first you ahve ti define the sceham 
//this sounds counter intuitivesince mongodb is schemaless?
// that is true but mongoosse makes you define schema for things like autocompletions/validations data befoere it goes in the db to maek sure you are doing things righ
// schemaless dbs can be very dangerous usningschema in mongo makes it silthly less dangerous

//assignment

