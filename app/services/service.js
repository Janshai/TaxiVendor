const superagent = require('superagent')
const rideOption = require('../models/rideOption')
const baseURL = 'https://techtest.rideways.com/'
const timeout_limit = 2000

function getRideOptions(supplier, pickup, dropoff) {
    let url = baseURL + supplier + "/"
    return new Promise((resolve, reject) => {
        superagent.get(url)
        .query({ pickup: pickup, dropoff: dropoff })
        .timeout({response: timeout_limit})
        .end((err, res) => {
            if (err) {
                return reject(parseError(err, supplier))
            }
            let carList = unWrapCarList(res.body)
            resolve(carList)
        })
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

function parseError(error, supplier) {
    if (error.timeout) {
        return supplier + " timed out."
    }
    let errorBody = error.response.body
    let supplierID = " for supplier: " + supplier
    if (errorBody.status == 400) {
        return errorBody.message + supplierID
    } else if (errorBody.status == 500) {
        return errorBody.error + supplierID
    } else {
        return "Unknown Error" + supplierID
    }

}

module.exports = {getRideOptions}
