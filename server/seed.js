const mongoose = require('mongoose');
const Workout = require('./models/Workout');

mongoose.connect('mongodb://localhost:27017/breakasweat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedWorkouts = [
  {
    title: 'Men’s Strength Routine',
    gender: 'men',
    goal: 'strength',
    type: 'strength',
    duration: 30,
    equipment: ['dumbbells'],
    videoUrl: 'https://player.vimeo.com/video/123456789', // Replace with your Vimeo URL
  },
  {
    title: 'Women’s Toning Workout',
    gender: 'women',
    goal: 'toning',
    type: 'strength',
    duration: 25,
    equipment: ['resistance bands'],
    videoUrl: 'https://player.vimeo.com/video/987654321', // Replace with your Vimeo URL
  },
];

Workout.insertMany(seedWorkouts)
  .then(() => {
    console.log('Workouts seeded');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Seeding failed:', err);
    mongoose.connection.close();
  });