const yargs = require('yargs')
const cars = require('./cars')
const supplier = require('./supplier')

const argsErrorString = `Error, please provide a pickup and dropoff (longitude,lattitude)\n
Examples:\n
node console-app.js 51.470020,-0.454295 51.00000,1.0000
npm console 51.470020,-0.454295 51.00000,1.0000\n`

main()

function main() {
    if (yargs.argv._.length < 2) {
        console.log(argsErrorString)
        return
    }

    //TODO: validate the arguments with regex

    supplier.getRideOptions('dave', (err, carList) => {
        if (err) { return console.log(err) }

        for (i in carList) {
            let car = carList[i]
            let string = car.type + " " + car.price
            console.log(string)
        }
    })
}
