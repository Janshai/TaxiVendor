const service = require('../services/service')
const vendors = ['dave', 'eric', 'jeff']
const CarType = {
    numberOfCarTypes: 6,
    passengerCounts: [4, 6, 16],
    carTypes: {
        4: ["STANDARD", "EXECUTIVE", "LUXURY"],
        6: ["PEOPLE_CARRIER", "LUXURY_PEOPLE_CARRIER"],
        16: ["MINIBUS"]
    }
}

function getRideOptions(pickup, dropoff, passengers) {
    return new Promise((resolve) => {
        var eligibleCarTypes = getEligibleCarTypes(passengers || 0)
        var vendorPromises = vendors.map(vendor => {
            return getOptionsForVendor(vendor, pickup, dropoff, eligibleCarTypes)
        })

        Promise.all(vendorPromises.map(p => p.catch(e => e)))
        .then(vendorRideOptions => {
            resolve(selectCheapestCars(vendorRideOptions))
        })
    })

}

function getRideOptionsForSingleVendor(vendor, pickup, dropoff, passengers) {
    var eligibleCarTypes = getEligibleCarTypes(passengers || 0)
    return getOptionsForVendor(vendor, pickup, dropoff, eligibleCarTypes)
}

function selectCheapestCars(vendorRides) {
    var cheapestCars = {}
    cheapestCars.errors = []
    for (i in vendorRides) {
        let rides = vendorRides[i]
        if (typeof rides === "string") {
            cheapestCars.errors.push(rides)
            console.log(rides + "\n")
        } else {
            for (j in rides) {
                let ride = rides[j]
                if (cheapestCars[ride.type]) {
                    if (cheapestCars[ride.type].price > ride.price) {
                        cheapestCars[ride.type] = ride
                    }
                } else {
                    cheapestCars[ride.type] = ride
                }
            }
        }
    }

    return cheapestCars
}

function getOptionsForVendor(vendor, pickup, dropoff, eligibleCarTypes) {
    return new Promise((resolve, reject) => {
        service.getRideOptions(vendor, pickup, dropoff)
        .then(carList => {
            if (eligibleCarTypes.length < CarType.numberOfCarTypes) {
                carList = removeIneligibleCars(carList, eligibleCarTypes)
            }
            resolve(carList)
        }, error => {
            reject(error)
        })
    })
}

function removeIneligibleCars(carList, eligibleTypes) {

    var newCarList = []

    for (i in carList) {
        let car = carList[i]
        if (eligibleTypes.includes(car.type)) {
            newCarList.push(car)
        }
    }
    return newCarList
}

function getEligibleCarTypes(passengers) {
    var eligibleCarTypes = []

    for (i in CarType.passengerCounts) {
        let count = CarType.passengerCounts[i]
        if (count >= passengers) {
            let types = CarType.carTypes[count]
            for (j in types) {
                eligibleCarTypes.push(types[j])
            }
        }
    }

    return eligibleCarTypes
}

module.exports = {getRideOptions, getRideOptionsForSingleVendor}
