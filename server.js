const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/bookRoutes');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/books', bookRoutes);


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected!');
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch((err) => {
    console.log('Connection failed:', err);
  });