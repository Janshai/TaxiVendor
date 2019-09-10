const supplier = require('./supplier')
const rideOption = require('./rideOption')
const vendors = ['dave', 'eric', 'jeff']
const CarType = {
    passengerCounts: [4, 6, 16],
    carTypes: {
        4: ["STANDARD", "EXECUTIVE", "LUXURY"],
        6: ["PEOPLE_CARRIER", "LUXURY_PEOPLE_CARRIER"],
        16: ["MINIBUS"]
    }
}

function getRideOptions(pickup, dropoff, passengers, callback) {
    supplier.getRideOptions(vendors[0], pickup, dropoff, (err, carList) => {
        if (err) {
            return callback(err)
        } else if (passengers) {
            carList = removeTooSmallOptions(carList, passengers)
        }

        callback(undefined, carList)
    })
}

function removeTooSmallOptions(carList, passengers) {
    var newCarList = []

    for (i in CarType.passengerCounts) {
        let count = CarType.passengerCounts[i]
        if (count >= passengers) {
            for (j in carList) {
                let car = carList[j]
                if (CarType.carTypes[count].includes(car.type)) {
                    newCarList.push(car)
                }
            }
        }
    }

    return newCarList
}

module.exports = {getRideOptions}
