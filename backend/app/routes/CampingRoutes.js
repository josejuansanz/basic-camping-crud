let CampingRoutes = require('express').Router();

let CampingController = require('../controllers/CampingController');

CampingRoutes.route('/camping')
  .get((req, res) => {

    CampingController.getCampings((err, campings) => {
      res.json(campings);
    });

  })
  .post((req, res) => {

    CampingController.createCamping(req.body, (err, camping) => {
      if (err) return res.status(400).json({message: 'Error creating camping!'});
      res.json({message: 'Camping successfully created!', camping: camping});
    });

  });

CampingRoutes.route('/camping/:id')
  .put((req, res) => {

    CampingController.updateCamping(req.params.id, req.body, (err, camping) => {
      if (err) return res.status(400).json({message: 'Error updating camping!'});
      res.json({message: 'Camping successfully updated!', camping: camping});
    });

  })
  .delete((req, res) => {

    CampingController.deleteCamping(req.params.id, (err) => {
      if (err) return res.status(400).json({message: 'Error deleting camping!'});
      res.json({message: 'Camping successfully deleted!'});
    });

  });

module.exports = CampingRoutes;