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
    return Tracking.aggregate([
      {
        '$group': {
          '_id': '$User',
          'Count': {
            '$sum': 1
          }
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': '_id',
          'foreignField': '_id',
          'as': 'User'
        }
      }, {
        '$addFields': {
          'User': {
            '$arrayElemAt': [
              '$User', 0
            ]
          }
        }
      }, {
        '$set': {
          'UserType': '$User.UserType',
          'GivenName': '$User.GivenName',
          'FamilyName': '$User.FamilyName',
          'Email': '$User.Email'
        }
      }, {
        '$unset': [
          'User'
        ]
      }
    ])
  } catch (e) {
    throw Error('Could not aggregate')
  }
}

exports.getTopTenArticles = async () => {
  try {
    let views = await exports.getViewsForAllArticles()
    let sorted = views.sort((a, b) => {
      return b.Count - a.Count
    })
    let chopped = sorted.slice(0, 10)
    return chopped
  } catch (e) {
    throw Error('Could not aggregate')
  }

}
