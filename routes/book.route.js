const express = require(`express`)
// Load func from simple-middleware
const { midOne } = require(`../middlewares/simple-middleware`)
const app = express()
app.use(express.json())
const bookController = require(`../controllers/book.controller`)
app.get("/", [midOne], bookController.getAllBooks)
app.post("/", bookController.addBook)
app.post("/find", bookController.findBook)
app.post("/find/:id", bookController.findBook)
app.put("/:id", bookController.updateBook)
app.delete("/:id", bookController.deleteBook)
module.exports = app

