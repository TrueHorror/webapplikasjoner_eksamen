const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TrackingSchema = new Schema({
  Time: {type: Date, required: true},
  URL: {type: String, required: false},
  Type: {type: String, required: false},
  EntityId: {type: Schema.Types.ObjectId, ref: 'Article', required: false},
  User: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const Tracking = mongoose.model('Tracking', TrackingSchema)

module.exports = Tracking
