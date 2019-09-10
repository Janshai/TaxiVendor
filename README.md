# BookingGo Techincal Test Submission


## Setup
###Dependencies:

* npm (I am using version 6.11.3)
* javascript
* node (I am using version 11.11.0)
* express (^4.17.1)
* superagent (^5.1.0)
* yargs (^14.0.0)


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

##Part 2

###Start Up

`node app.js` or `npm start` from the root directory.

###GET Requests
####URL
`localhost:8000/rides/`

####Parameters
* pickup: Longitude,Lattitude
* dropoff: Longitude,Latittude
* passengers (optional): Integer

####Response

``` javascript
{
	"errors": [String], // Any errors such as internal server errors from one of the suppliers or a timeout in the response are listed here
	"CAR_TYPE": {
		"supplier": "supplierID",
		"type": "CAR_TYPE",
		"price": Integer
	} // Repeated for each available CAR_TYPE
}
```

####Example Request
`GET localhost:8000/rides/?pickup=51.470020,-0.454295&dropoff=-1.0448392,52.5649&passengers=5`

####Example Response

```
{
    "errors": [
        "dave timed out.",
        "jeff timed out."
    ],
    "PEOPLE_CARRIER": {
        "supplier": "ERIC",
        "type": "PEOPLE_CARRIER",
        "price": 341913
    },
    "LUXURY_PEOPLE_CARRIER": {
        "supplier": "ERIC",
        "type": "LUXURY_PEOPLE_CARRIER",
        "price": 503468
    },
    "MINIBUS": {
        "supplier": "ERIC",
        "type": "MINIBUS",
        "price": 17619
    }
}
```

If there are errors that cause the requests to each supplier to fail, the response will look something like this.

```
{
    "status": 400,
    "error": "Bad Request",
    "message": "If passengers parameter specified, it must be an integer"
}
```


####Other Request

You can also limit your search to just one supplier by putting the supplierID before the parameters

##### Example Request
`localhost:8000/rides/dave?pickup=51.470020,-0.454295&dropoff=-1.0448392,52.5649&passengers=5`

##### Example Response

```
[
    {
        "supplier": "DAVE",
        "type": "PEOPLE_CARRIER",
        "price": 939431
    },
    {
        "supplier": "DAVE",
        "type": "LUXURY_PEOPLE_CARRIER",
        "price": 648711
    }
]
```
