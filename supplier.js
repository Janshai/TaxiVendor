const superagent = require('superagent')
const baseURL = 'https://techtest.rideways.com/'

function getRideOptions(supplier, callback) {
    let url = baseURL + supplier + "/"
    superagent.get(url)
    .query({ pickup: "3.410632,-2.157533", dropoff: "51.00000,1.0000" })
    .end((err, res) => {
        if (err) {
        }

        console.log(res.body)
    })
}

module.exports = {getRideOptions}
