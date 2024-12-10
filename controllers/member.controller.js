/** load model for 'member' table */
const memberModel = require(`../models/index`).member


/** Load Operation from Sequelize */
const Op = require(`sequelize`).Op


/** Create function for read all data */
exports.getAllMember = async (request, response) => {
    /** call findAll() to get all data */
    let members = await memberModel.findAll()
    return response.json({
        success: true,
        data: members,
        message: `All members have been loaded`
    })
}


/** Create function for filter*/
exports.findMember = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation 
     * to find data based on keyword */
    let members = await memberModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword} },
                { gender: { [Op.substring]: keyword} },
                { address: { [Op.substring]: keyword} }
            ]
        }
    })
    return response.json({
        success: true,
        data: members,
        message: `All Members have been loaded`
    })
}


/** Create function for add new member */
exports.addMember = (request, response) => {
    /** prepare data from request */
    let newMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    /** Execute inserting data to user's table */

    
    memberModel.create(newMember)
    .then(result => {
        /** if insert's process success */
        return response.json({
            success: true,
            data: result,
            message: `New members has been inserted`
        })
    })
    .catch(error => {
        /** if insert's process success */
        return response.json({
            success: false,
            message: error.message
        })
    })
}


/** Create function for update member */
exports.updateMember = (request, response) => {
    /** prepare data that has been changed */
    let dataMember = {
        name: request.body.name,
        address: request.body.address,
        gender: request.body.gender,
        contact: request.body.contact
    }

    /**define id member that will be update */
    let idMember = request.params.id

    /** execute update data based on defined id member */
    memberModel.update(dataMember, { where: {id: idMember} })
    .then(result => {
        /** if update's process success */
        return response.json({
            success: true,
            message: `Data member has been updated`
        })
    })
    .catch(error => {
        /** if update's process fail */
        return response.json({
            success: false,
            message: error.message
        })
    })
}


/** create function for delete data */
exports.deleteMember = (request, response) => {
    /** define id member that will be update */
    let idMember = request.params.id

    /** execute delete data based on defined id member */
    memberModel.destroy({ where: {id: idMember} })
    .then(result => {
        return response.json({
            success: true,
            message: `Data member has been deleted`
        })
    })
    .catch(error =>{
       return response.json({
        success: false,
        message: error.message
       }) 
    })
}