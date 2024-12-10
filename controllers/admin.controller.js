const adminModel = require(`../models/index`).admin
const md5 = require(`md5`)
/** Load Operation from Sequelize */
const Op = require(`sequelize`).Op
//load func auth form controller
const { authorize } = require(`../controllers/auth.controller`)

// Fungsi untuk mendapatkan semua data admin
exports.getAllAdmin = async (request, response) => {
    let admins = await adminModel.findAll();
    return response.json({
        success: true,
        data: admins,
        message: `All Admins have been loaded`
    });
};

// Fungsi untuk menambahkan data admin baru
exports.addAdmin = (request, response) => {
    let newAdmin = {
        name: request.body.name,
        username: request.body.username,
        password: md5(request.body.password),
        address: request.body.address,
        contact: request.body.contact  
    };
    /** Execute inserting data to user's table */
    adminModel.create(newAdmin)
    .then(result => {
        /** if insert's process success */
        return response.json({
            success: true,
            data: result,
            message: `New Admins has been inserted`
        })
    })
    .catch(error => {
        /** if insert's process success */
        return response.json({
            success: false,
            message: error.message
        })
    })
};

exports.findAdmin = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword

    /** call findAll() within where clause and operation 
     * to find data based on keyword */
    let admins = await adminModel.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: keyword} },
                { username: { [Op.substring]: keyword} },
                { contact: { [Op.substring]: keyword} }
            ]
        }
    })
    return response.json({
        success: true,
        data: admins,
        message: `All Admins have been loaded`
    })
}


// Fungsi untuk mengubah data admin
exports.updateAdmin = (request, response) => {
    let dataAdmin = {
        name: request.body.name,
        username: request.body.username,
        password: md5(request.body.password)
    };
    let idAdmin = request.params.id;
    adminModel.update(dataAdmin, { where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been updated`
            });
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            });
        });
};

// Fungsi untuk menghapus data admin
exports.deleteAdmin = (request, response) => {
    let idAdmin = request.params.id;
    adminModel.destroy({ where: { id: idAdmin } })
        .then(result => {
            return response.json({
                success: true,
                message: `Data admin has been deleted`
            });
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            });
       });
};

