const express = require('express')
const compression = require('compression')
const winston = require('winston')

const { serveBuild } = require('../middlewares/serve-build')
const { serveApp } = require('../middlewares/serve-app')
const { router: apiV1 } = require('../routes/v1')

const PORT = process.env.PORT || 8080
const app = express()

const init = () => {
    app.use(compression())
    app.use('/api/v1', apiV1)
    app.use(serveBuild())
    app.get('*', serveApp())
}

const start = () => {
    app.listen(PORT, () => winston.info(`[ssr] server running on ${PORT}`))
}

module.exports = {
    init,
    start,
}
