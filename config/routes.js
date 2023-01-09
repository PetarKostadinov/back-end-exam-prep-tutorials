const authController = require("../controlers/authController");
const courseController = require("../controlers/courseController");
const homeController = require("../controlers/homeController");
const { hasUser } = require("../middlewares/guards");

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/course', hasUser(), courseController);
};