// adding required api routes
const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.use((req, res) => res.send('change route'));

module.exports = router;
