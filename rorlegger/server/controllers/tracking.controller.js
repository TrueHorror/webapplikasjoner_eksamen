const TrackingService = require('../services/tracking.service');

exports.createNewEntry = async (req, res, next) => {
  try {
    await TrackingService.newEntry(req.body);
    return res.status(201).json({message: "Entry saved"})
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.getViewsForAllArticles = async (req, res, next) => {
  try {
    let views = await TrackingService.getViewsForAllArticles()
    return res.status(200).json({message: "Successfully counted views", views})
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.getTopTenArticles = async (req, res, next) => {
  try {
    let views = await TrackingService.getTopTenArticles()
    return res.status(200).json({message: "Successfully counted view", views})
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}

exports.getViewsPerUser = async (req, res, next) => {
  try {
    let views = await TrackingService.getViewsPerUser()
    return res.status(200).json({message: "Successfully counted views", views})
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}
