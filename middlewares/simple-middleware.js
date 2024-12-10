// Create first simple middleware
const midOne = async(request, response, next) => {
    console.log(`Run Middleware One`)
    next()
    // next() func used to continue to the controller
}

// Export func to another file
module.exports = {
    midOne
}
