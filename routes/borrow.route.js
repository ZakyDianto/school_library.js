/** load library express */
const express = require(`express`)

/** initiate object that instance of express */
const app = express()

/** allow to read 'request' with json type */
app.use(express.json())

/** load member's controller */
const borrowController = require(`../controllers/borrow.controller`)

/** create route to add new borrow using method POST */
app.post("/", borrowController.addBorrowing)

/** create route to update borrow
 * using method PUT and define paramater for "id" */
app.put("/:id", borrowController.updateBorrowing)

/** method DELETE */
app.delete("/:id", borrowController.deleteBorrowing)

//create route to return book
app.get("/return/:id", borrowController.returnBook)

/** create route to show all member using method GET */
app.get("/", borrowController.getBorrow)




/** export app in order to load in another file */
module.exports = app
