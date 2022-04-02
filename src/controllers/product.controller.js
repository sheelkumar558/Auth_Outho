const express = require("express");
const Product = require("../modules/products.model");
const authorise = require("../middleweres/authhorise")
const authenticate = require("../middleweres/authenticate");
//const res = require("express/lib/response");
//const User = require('../modules/user.modul');
const router = express.Router();

// router.get("", (req,res)=>{

// });

router.post("", authenticate, async (req, res) => {
  req.body.user_id = req.user_id;
  try {
    const product = await Product.create(req.body);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.patch("/:id", authenticate,authorise(["admin","seller"]) ,async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const product = await Product.find().lean().exec();
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

module.exports = router;
