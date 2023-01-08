const authController = require("../controlers/authController");
const homeController = require("../controlers/homeController")

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
};