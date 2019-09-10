const cars = require('./cars')

function getAll(req, res) {
    let pickup = req.query.pickup
    let dropoff = req.query.dropoff
    let passengers = req.query.passengers
    validateParameters(pickup, dropoff, passengers, undefined, res)

    cars.getRideOptions(pickup, dropoff, passengers)
    .then(rides => {
        res.json(rides)
    })

}

function getSingleVendor(req, res) {
    let pickup = req.query.pickup
    let dropoff = req.query.dropoff
    let passengers = req.query.passengers
    let vendor = req.params.vendorID
    validateParameters(pickup, dropoff, passengers, vendor, res)

    cars.getRideOptionsForSingleVendor(vendor, pickup, dropoff, passengers)
    .then(rides => {
        res.json(rides)
    }, error => {
        if (error.includes("Internal") || error.includes("timed")) {
            let resBody = {
                status: 500,
                error: "Internal Server Error",
                message: "Something went wrong: " + error
            }
            res.status(500)
            res.json(resBody)
        } else {
            let resBody = {
                status: 400,
                error: "Bad Request",
                message: error
            }
            res.status(400)
            res.json(resBody)
        }
    })
}

function validateParameters(pickup, dropoff, passengers, vendor, res) {
    if (pickup === undefined) {
        let resBody = {
            status: 400,
            error: "Bad Request",
            message: "No pickup location specified"
        }
        res.status(400)
        res.json(resBody)
    } else if (dropoff === undefined) {
        let resBody = {
            status: 400,
            error: "Bad Request",
            message: "No dropoff location specified"
        }
        res.status(400)
        res.json(resBody)
    } else if (Number.isInteger(passengers)) {
        let resBody = {
            status: 400,
            error: "Bad Request",
            message: "If passengers parameter specified, it must be an integer"
        }
        res.status(400)
        res.json(resBody)
    } else if (vendor) {
        if ((vendor != "dave") && (vendor != "eric") && (vendor != "jeff")) {
            let resBody = {
                status: 400,
                error: "Bad Request",
                message: "Invalid Vendor"
            }
            res.status(400)
            res.json(resBody)
        }
    }

}

module.exports = { getAll, getSingleVendor }
