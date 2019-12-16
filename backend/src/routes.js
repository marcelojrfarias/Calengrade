const express = require('express')

const routes = express.Router()

const UFABCSummaryController = require('./controllers/UFABCSummaryController')
const CalendarController = require('./controllers/CalendarController')

routes.post('/ufabcsummary', UFABCSummaryController.store)
routes.post('/calendar', CalendarController.store)

module.exports = routes