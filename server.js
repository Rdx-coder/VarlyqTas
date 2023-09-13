const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const config = require('./config/config');
const { connectToRedis } = require('./utils/redis');

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');

// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');

// Apply authentication middleware to protected routes
app.use('/posts', authMiddleware);
app.use('/users', authMiddleware);

app.use('/posts', postsRoutes);
app.use('/users', usersRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to APIs');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to Redis
connectToRedis();
