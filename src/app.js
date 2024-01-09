const express = require('express');
const bodyParser = require('body-parser');
const routeUser = require('./controller/user.controller')


const app = express()

app.use(bodyParser.json())

app.use('/user', routeUser)
// app.use('/task', route)

app.use((er, req, res, next) => res.send(er.message))

module.exports = { app }