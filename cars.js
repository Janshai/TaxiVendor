const supplier = require('./supplier')
const rideOption = require('./rideOption')
const vendors = ['dave', 'eric', 'jeff']

function getRideOptions(pickup, dropoff, callback) {
    supplier.getRideOptions(vendors[0], pickup, dropoff, callback)
}

module.exports = {getRideOptions}
