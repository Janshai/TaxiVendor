const yargs = require('yargs')
const cars = require('./cars')

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

    cars.getRideOptions(yargs.argv._[0], yargs.argv._[1], passengers)
    .then(rides => {
        if (rides.length == 0) {
            console.log("No rides available right now, please try again later.")
        } else {
            for (i in rides) {
                let ride = rides[i]
                console.log(ride.type + " - " + ride.supplier + " - " + ride.price)
            }
        }
    })
}
