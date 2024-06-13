const mongoose = require('mongoose');
const { User, Thought } = require('../models');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nosql_socialnetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Listen for the connection event
mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Seed data for users
    const usersSeedData = [
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
    ];

    // Seed data for thoughts
    const thoughtsSeedData = [
      { thoughtText: 'Thought 1 from user 1', username: 'user1' },
      { thoughtText: 'Thought 2 from user 1', username: 'user1' },
    ];

    // Insert seed data for users
    const insertedUsers = await User.insertMany(usersSeedData);
    console.log(`${insertedUsers.length} users seeded`);

    // Insert seed data for thoughts
    const insertedThoughts = await Thought.insertMany(thoughtsSeedData);
    console.log(`${insertedThoughts.length} thoughts seeded`);

    // Close the database connection
    mongoose.disconnect();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error seeding data:', error);
    // Close the database connection
    mongoose.disconnect();
    console.log('Connection closed due to error');
  }
});