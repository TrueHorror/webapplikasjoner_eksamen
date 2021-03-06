var Category = require('../models/category.model')

exports.getCategories = async function (){
  try {
    return await Category.find()
  } catch (e) {
    console.error(e)
    throw Error('Could not find any categories')
  }
}

exports.createCategory = async function (data) {
  try {
    return await Category.create({
      Name: data.Name,
    })
  } catch (e) {
    console.error(e)
    throw Error('Could not create a category')
  }
}

exports.getCategory = async function (id) {
  try {
    return await Category.findOne({_id: id})
  } catch (e) {
    throw Error('Could not find category')
  }
}
