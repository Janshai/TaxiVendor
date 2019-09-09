const yargs = require('yargs')
const cars = require('./cars')
const supplier = require('./supplier')

main()

function main() {
    console.log(yargs.argv._.length)
    supplier.getRideOptions('dave', undefined)
}
