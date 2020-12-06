const Request = require('../models/requests.model')
const RequestMailer = require('../mailng/requests.mailing')

exports.createRequest = async function (data) {
  try {
    let body = data.body
    await Request.create({
      GivenName: body.GivenName,
      FamilyName: body.FamilyName,
      Email: body.Email,
      Message: body.Message
    })
    await RequestMailer.sendConfirmationMail(body.Email, body.Message)
  } catch (e) {
    throw Error('Could not create request')
  }
}
