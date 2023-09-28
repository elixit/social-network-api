const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
// using routers and accessing from the correct folder

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
