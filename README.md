# BookingGo Techincal Test Submission


## Setup
###Dependencies:

* npm
* javascript
* node
* superagent
* yargs


###Dependency Installation Instructions:

Running `npm install` inside the root directory should install all necessary dependencies.

## Part 1
### Console application to print the search results for Dave's Taxis

`node console-app.js pickup dropoff supplierID`

Example:

`node console-app.js 51.470020,-0.454295 51.00000,1.0000 dave` searches for the results from Dave's Taxis.

THis command will work for all three of the suppliers.

### Console application to filter by number of passengers


`node console-app.js pickup dropoff --passengers=n`

Example:

`node console-app.js 51.470020,-0.454295 51.00000,1.0000 --passengers=3`

The passengers flag is optional. If you leave it out, the application will provide all car options.

Example:

`node console-app.js 51.470020,-0.454295 51.00000,1.0000`
