const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  workoutsCompleted: [{ type: Schema.Types.ObjectId, ref: 'Workout' }],
  isAdmin: { type: Boolean, default: false }, // For Nitta Duma
});

module.exports = mongoose.model('User', userSchema);