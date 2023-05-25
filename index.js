const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes/mainRoutes.js')
const db = require('./dbconnect.js')

const cors = require('cors')

const app = express()

// app.use('api/movieflex',)
app.use(bodyParser.json())
app.use(cors({origin:'http://localhost:4200'}))
app.use('/api/movieflex',routes)


db().then( () =>{
    app.listen(3000,() => console.log('server started at port number 3000...'))
    console.log('database connected successfully...')
}).catch(error => console.log(error))

