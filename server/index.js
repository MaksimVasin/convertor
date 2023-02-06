require('dotenv').config()
const express = require('express')
const sequelize = require('./db.js')
//const models = require('./models/models.js')
const cors = require('cors')
const router = require('./routes/index.js')
//const { request } = require('express')
const errorHandler = require('./middleware/ErrorHandlingMiddleware.js')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

app.use(errorHandler)

const start = async () => {

  try {
    await sequelize.authenticate() // подключение к БД
    await sequelize.sync( ) // сравнение бд со схемой

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  }
  catch(e) {
    console.log(e);
  }

}

start();

