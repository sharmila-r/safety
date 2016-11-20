var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contactSchema = new Schema({
  id: Number,
  contactName: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  contactOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  contactType:{type: Array, required: true},
  created_at: Date,
  updated_at: Date
});

var Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
