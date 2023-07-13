const express = require("express");
const router = express.Router();
const usersRoutes = require("./auth.routes");
const elementsRoutes = require("./element.routes");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", usersRoutes);
router.use("/elements", elementsRoutes);

module.exports = router;
