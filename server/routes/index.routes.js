const express = require("express");
const router = express.Router();
const usersRoutes = require("./auth.routes");
const elementsRoutes = require("./element.routes");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", usersRoutes);
router.use("/elements", isAuthenticated, elementsRoutes);

module.exports = router;
