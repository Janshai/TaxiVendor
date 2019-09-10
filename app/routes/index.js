const apiController = require('../controllers/api')

module.exports = function(app) {
    app.get('/rides', apiController.getAll)

    //get single vendor
    app.get('/rides/:vendorID', apiController.getSingleVendor)
}
