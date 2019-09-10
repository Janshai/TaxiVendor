const yargs = require('yargs')
const cars = require('./app/controllers/cars')

const argsErrorString = `Error, please provide a pickup and dropoff (longitude,lattitude)\n
Examples:\n
node console-app.js 51.470020,-0.454295 51.00000,1.0000
npm run console 51.470020,-0.454295 51.00000,1.0000\n`

main()

function main() {
    if (yargs.argv._.length < 2) {
        console.log(argsErrorString)
        return
    }

    let passengers = yargs.argv.passengers
    let pickup = yargs.argv._[0]
    let dropoff = yargs.argv._[1]

    if (yargs.argv._.length == 3) {
        let vendor = yargs.argv._[2]
        if ((vendor == "dave") || (vendor == "eric") || (vendor == "jeff")) {
            singleVendorApplication(vendor, pickup, dropoff, passengers)
        } else {
            console.log("Invalid supplierID")
        }
    } else {
        allVendorsApplication(pickup, dropoff, passengers)
    }



}

function singleVendorApplication(vendor, pickup, dropoff, passengers) {
    cars.getRideOptionsForSingleVendor(vendor, pickup, dropoff, passengers)
    .then(rides => {
        for (i in rides) {
            let ride = rides[i]
            console.log(ride.type + " - " + ride.price)
        }
    }, error => {
        console.log(error)
    })
}

function allVendorsApplication(pickup, dropoff, passengers) {
    cars.getRideOptions(pickup, dropoff, passengers)
    .then(rides => {
        if (Object.keys(rides).length == 0) {
            console.log("No rides available right now, please try again later.")
        } else {
            for (i in rides) {
                if (i != "errors") {
                    let ride = rides[i]
                    console.log(ride.type + " - " + ride.supplier + " - " + ride.price)
                }

            }
        }
    })
}
