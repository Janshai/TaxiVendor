const superagent = require('superagent')
const rideOption = require('./rideOption')
const baseURL = 'https://techtest.rideways.com/'

function getRideOptions(supplier, pickup, dropoff, callback) {
    let url = baseURL + supplier + "/"
    superagent.get(url)
    .query({ pickup: pickup, dropoff: dropoff })
    .end((err, res) => {
        if (err) {
            return callback(parseError(err.response.body))
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

function parseError(error) {
    if (error.status == 400) {
        return error.message
    } else if (error.status == 500) {
        return error.error
    } else {
        return "Unknown Error"
    }

}

module.exports = {getRideOptions}
