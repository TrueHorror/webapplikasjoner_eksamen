const Tracking = require('../models/tracking.model')

exports.newEntry = async (data) => {
  try {
    console.log(data.id);
    return Tracking.create({

      Time: new Date(),
      Type: data.type,
      EntityId: data.id,
      User: data.userId
    })
  } catch (e) {
    console.error(e)
    throw Error('Could not create new tracking entry')
  }
}

exports.getViewsForAllArticles = async () => {
  try {
    return Tracking.aggregate([
      {
        '$group': {
          '_id': '$EntityId',
          'Count': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'articles',
          'localField': '_id',
          'foreignField': '_id',
          'as': 'Article'
        }
      }, {
        '$addFields': {
          'Article': {
            '$arrayElemAt': [
              '$Article', 0
            ]
          }
        }
      }, {
        '$set': {
          'Title': '$Article.Title',
          'Created': '$Article.Created',
          'Writer': '$Article.Writer'
        }
      }, {
        '$unset': [
          'Article'
        ]
      }
    ])
  } catch (e) {
    throw Error('Could not aggregate')
  }
}

exports.getViewsPerUser = async () => {
  try {

  }
}
