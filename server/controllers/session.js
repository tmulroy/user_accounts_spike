const mongoose = require('mongoose')
const mongoDb = require('../config/db')

// function find (collec, query, callback) {
//     mongoDb.db.collection(collec, function (err, collection) {
//     collection.find(query).toArray(callback);
//   })
// }

class sessionController {

  static findByID(sessionID) {
    mongoDb.db.collection('sessions', (err, collection) => {
      return collection.find({ _id: `${sessionID}`})
    })
  }

  static addUserID(sessionID, userID) {
    let session = this.findByID(sessionID)
    
  }

}

module.exports = sessionController
