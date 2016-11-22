let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CampingSchema = new Schema({
  name:       { type: String, required: true },
  phone:      { type: String, required: true },
  email:      { type: String, required: true },
  address:    { type: String, required: true },
  location:   {
    lat:  { type: String, required: true },
    lon:  { type: String, required: true }
  },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('camping', CampingSchema);