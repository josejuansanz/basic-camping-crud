let ObjectId = require('mongoose').Types.ObjectId;
let CampingModel = require('../models/CampingModel');

class CampingController {

  getCampings(cb) {
    CampingModel.find({}, (err, campings) => {
      cb(err, campings);
    });
  }

  createCamping(camping, cb) {
    CampingModel.create(camping, (err, campingCreated) => {
      cb(err, campingCreated);
    });
  }

  updateCamping(id, camping, cb) {
    CampingModel.findOneAndUpdate({_id: new ObjectId(id)}, camping, {new: true}, (err, campingUpdated) => {
      cb(err, campingUpdated);
    });
  }

  deleteCamping(id, cb) {
    CampingModel.findOneAndRemove({_id: new ObjectId(id)}, (err, camping) => {
      cb(err);
    });
  };

}

module.exports = new CampingController();