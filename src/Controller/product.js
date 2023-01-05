const productModel = require("../models/productModel");
const {
  isValidRequest,
  isValidString,
  isValidTitle,
  isValidPrice,
} = require("../validatior");

//==================================================CREATE PRODUCT==================================================
const createProduct = async function (req, res) {
  try {
    if (!isValidRequest(req.body)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid input" });
    }
    let {
      title,
      description,
      price,
      currencyId,
      currencyFormat,
      installments,
    } = req.body;
    let productData = {};
    let productImage = req.files;

    //validationg product title
    if (!title) {
      return res
        .status(400)
        .send({ status: false, message: "Title is required" });
    }

    if (!isValidString(title) || !isValidTitle(title)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter title in valid format" });
    }
    const isDuplicateTitle = await productModel.findOne({ title: title });
    if (isDuplicateTitle) {
      return res
        .status(409)
        .send({ status: false, message: `${title} title is already in use` });
    }
    productData.title = title;

    //validating product description
    if (!description) {
      return res
        .status(400)
        .send({ status: false, message: "Description is required" });
    }
    if (!isValidString(description)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter description in valid format" });
    }
    productData.description = description;

    //validating price
    if (!price) {
      return res
        .status(400)
        .send({ status: false, message: "Price is required" });
    }
    if (!isValidPrice(price)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid price" });
    }
    productData.price = price;

    //validating currencyId if given
    if (currencyId) {
      if (!["INR"].includes(currencyId)) {
        return res.status(400).send({
          status: false,
          message: "Enter valid currency abbreviation of Indian rupee",
        });
      }
      productData.currencyId = currencyId;
    }

    //validating currencyFormat if given
    if (currencyFormat) {
      if (!["₹"].includes(currencyFormat)) {
        return res.status(400).send({
          status: false,
          message: "Enter valid currency format either of Indian rupee",
        });
      }
      productData.currencyFormat = currencyFormat;
    }

    //validating installments if given
    if (installments) {
      if (/^[0-9]+$/.test(installments) == false) {
        return res.status(400).send({
          status: false,
          message: "Enter valid amount for installments",
        });
      }
      productData.installments = installments;
    }

    const product = await productModel.create(productData);

    return res
      .status(201)
      .send({ status: true, message: "Success", data: product });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};