const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Workout = require('../models/Workout');
const multer = require('multer');
const { uploadToVimeo } = require('../utils/vimeo');

const upload = multer({ dest: 'uploads/' });

// Get all workouts
router.get('/workouts', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

// Register user
router.post('/register', async (req, res) => {
  const { email, password, isAdmin } = req.body;
  const user = new User({ email, password, isAdmin });
  await user.save();
  res.json({ message: 'User registered', userId: user._id });
});const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Workout = require('../models/Workout');
const multer = require('multer');
const { uploadToVimeo } = require('../utils/vimeo');
const bcrypt = require('bcrypt');

const upload = multer({ dest: 'uploads/' });

// Get all workouts
router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve workouts' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, isAdmin });
    await user.save();
    res.json({ message: 'User registered', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ message: 'Login successful', userId: user._id, isAdmin: user.isAdmin });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to login user' });
  }
});

// Upload workout (admin only)
router.post('/upload-workout', upload.single('video'), async (req, res) => {
  try {
    const { title, gender, goal, type, duration, equipment, userId } = req.body;
    const user = await User.findById(userId);
    if (!user || !user.isAdmin) return res.status(403).json({ message: 'Unauthorized' });

    const equipmentArray = equipment ? equipment.split(',') : [];
    const videoUrl = await uploadToVimeo(req.file.path);

    const workout = new Workout({
      title,
      gender,
      goal,
      type,
      duration: Number(duration),
      equipment: equipmentArray,
      videoUrl,
      uploadedBy: user._id,
    });

    await workout.save();
    res.json({ message: 'Workout uploaded', workout });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload workout' });
  }
});

// Complete workout
router.post('/complete-workout', async (req, res) => {
  try {
    const { userId, workoutId } = req.body;
    await User.findByIdAndUpdate(userId, { $push: { workoutsCompleted: workoutId } });
    res.json({ message: 'Workout completed' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to complete workout' });
  }
});

module.exports = router;

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password }); // Add bcrypt in production
  if (user) res.json({ message: 'Login successful', userId: user._id, isAdmin: user.isAdmin });
  else res.status(401).json({ message: 'Invalid credentials' });
});

// Upload workout (admin only)
router.post('/upload-workout', upload.single('video'), async (req, res) => {
  const { title, gender, goal, type, duration, equipment, userId } = req.body;
  const user = await User.findById(userId);
  if (!user || !user.isAdmin) return res.status(403).json({ message: 'Unauthorized' });

  const equipmentArray = equipment ? equipment.split(',') : [];
  const videoUrl = await uploadToVimeo(req.file.path);

  const workout = new Workout({
    title,
    gender,
    goal,
    type,
    duration: Number(duration),
    equipment: equipmentArray,
    videoUrl,
    uploadedBy: user._id,
  });

  await workout.save();
  res.json({ message: 'Workout uploaded', workout });
});

// Complete workout
router.post('/complete-workout', async (req, res) => {
  const { userId, workoutId } = req.body;
  await User.findByIdAndUpdate(userId, { $push: { workoutsCompleted: workoutId } });
  res.json({ message: 'Workout completed' });
});

module.exports = router;