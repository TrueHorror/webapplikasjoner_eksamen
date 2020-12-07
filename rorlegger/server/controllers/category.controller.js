var CategoryService = require('../services/category.service')

exports.createCategory = async function (req, res, next) {
  try {
    await CategoryService.createCategory(req.body)
    return res.status(201).json({message: "Successfully created a category"});
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.getCategories = async function (req, res, next) {
  try {
    let categories = await CategoryService.getCategories()
    return res.status(200).json({categories, message: "Successfully retrieved categories"});
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

