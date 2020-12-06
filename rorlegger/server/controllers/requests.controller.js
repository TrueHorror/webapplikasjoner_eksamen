const RequestService = require('../services/requests.service')

exports.createRequest = async function (req, res, next) {
  try {
    await RequestService.createRequest(req)
    return res.status(201).json({message: "Successfylly created a request"});
  } catch (e) {
    console.error(e)
    return res.status(400).json({message: e.message})
  }
}
