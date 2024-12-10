const express = require(`express`)
const app = express()
app.use(express.json())
const{authenticate, aunthenticate} = require(`../controllers/auth.controller`)
app.post(`/`, aunthenticate)
module.exports = app