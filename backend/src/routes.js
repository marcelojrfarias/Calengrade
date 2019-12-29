const express = require('express')

const routes = express.Router()

const SummaryController = require('./controllers/SummaryController')
const CalendarController = require('./controllers/CalendarController')

routes.post('/summary', SummaryController.store)
routes.post('/calendar', CalendarController.store)

module.exports = routes