require('dotenv').config()

const express = require('express');

const cors = require('cors');

const morgan = require('morgan');

const routes = require('./routes')

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan('dev'))

app.use(routes);

app.listen(process.env.PORT || 3333, () => console.log(`Server ready on PORT: ${process.env.PORT || 3333}`));