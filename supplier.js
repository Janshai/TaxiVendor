const superagent = require('superagent')
const rideOption = require('./rideOption')
const baseURL = 'https://techtest.rideways.com/'

function getRideOptions(supplier, callback) {
    let url = baseURL + supplier + "/"
    superagent.get(url)
    .query({ pickup: "3.410632,-2.157533", dropoff: "51.00000,1.0000" })
    .end((err, res) => {
        if (err) {
            return callback(err)
        }

        let carList = unWrapCarList(res.body)
        callback(undefined, carList)
    })
}

function unWrapCarList(json) {
    let options = json.options
    let supplier = json.supplier_id
    var carList = []
    for (i in options) {
        let o = options[i]
        carList.push(new rideOption(supplier, o.car_type, o.price))
    }

    return carList
}

module.exports = {getRideOptions}
