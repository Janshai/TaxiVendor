const yargs = require('yargs')
const cars = require('./cars')
const supplier = require('./supplier')

main()

function main() {
    if (yargs.argv._.length < 2) {
        console.log("Error, please provide a pickup and dropoff (longitude,lattitude)")
        console.log("Examples:")
        console.log("node console-app.js 51.470020,-0.454295 51.00000,1.0000")
        console.log("npm console 51.470020,-0.454295 51.00000,1.0000")
        return
    }
    supplier.getRideOptions('dave', (err, carList) => {
        if (err) { return console.log(err) }

        for (i in carList) {
            let car = carList[i]
            let string = car.type + " " + car.price
            console.log(string)
        }
    })
}
