const Express = require('express')
const App = Express()
const Dotenv = require('dotenv')
const Morgan = require('morgan')
const Path = require('path')
const Cors = require('cors')

const { sequelize } = require('./models')

Dotenv.config({ path: __dirname + '/config/Config.env'})
const PORT = process.env.PORT || 8800

App.use(Cors())
App.use(Express.json())
App.use(Express.urlencoded({ extended: false }))
App.use(Express.static('public'))
App.set('view engine', 'ejs')
App.use(Morgan('dev'))

App.listen(PORT, async () => {
    console.log(`Server runnin in port : ${ PORT }`)
    await sequelize.sync({ force: false })
})

const Routes = require('./routes/index')
App.use('/api/v1/', Routes)

const ErrorHandler = require('./middleware/ErrorHandler')
App.use(ErrorHandler.errorHandler)