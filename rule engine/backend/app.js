const express = require('express');
const connectDB = require('./database');
const ruleRoutes = require('./routes/ruleRoutes');
const bodyParser = require('body-parser');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api/rules', ruleRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));