const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/database');
const studentRoutes = require('./routes/studentRoutes');
const healthCheckRoute = require('./routes/healthcheck');

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', studentRoutes);
app.use('/api', healthCheckRoute);

module.exports = app;
