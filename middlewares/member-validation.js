//Load joi library
const joi = require(`joi`)


//Create func to validate request of member
const validateMember = (request, response, next) => {
    //define rules for req
    const rules = joi
    .object()
    .keys({
        //name is required
        name: joi.string().required(),
        //address is required
        address: joi.string().required(),
        //contact is required
        contact: joi.number().required(),
        //gender is required
        gender: joi.string().valid(`Male`, `Female`),
    })
    .options({ abortEarly: false})

    //get error of validation if it exists
    let {error} = rules.validate(request.body)

    //if error exists
    if (error != null) {
        //get all error message
        let errMessage = error.details.map(it => it.message).join(",")

        //return error  message with code 422
        return response.status(422).json({
            success: false,
            message: errMessage
        })
    }
    //if error doesn't exists, continue to controller
    next()
}

module.exports = {validateMember}
