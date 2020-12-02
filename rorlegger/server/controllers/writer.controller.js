var WriterService = require('../services/writer.service')

exports.getWriters = function (req, res, next){
  try {
    return res.status(200).json({Writers: WriterService.getWriters(), message: "Sucessfully retrieved Writers"})
  } catch (e) {
    return res.status(400).json({message: e.message})
  }
}
