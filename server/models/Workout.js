const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: String,
  gender: String,
  goal: String,
  type: String,
  duration: Number,
  equipment: [String],
  videoUrl: String,
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Workout', workoutSchema);