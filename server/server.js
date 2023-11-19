const express = require('express');
const cors = require('cors');

const apiRouter = require('./routes');

const app = express();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Every route should start with /api
app.use('/api', apiRouter);

// Listen for requests
app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});