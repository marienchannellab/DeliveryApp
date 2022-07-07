const { Router } = require("express");
const Menu = require("../models/menu");
const router = Router();

//запрос всех позиций меню
router.get("/", async (req, res) => {
  const food = await Menu.getAll(req.query.shop);
  res.render("shops", {
    title: "Shop",
    isCourses: true,
    food,
    shopFilter: req.query.shop,
  });
});

module.exports = router;
