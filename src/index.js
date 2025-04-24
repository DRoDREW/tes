const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const routes = require('./api/routes');
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to REST API' });
});

app.use('/api', routes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});