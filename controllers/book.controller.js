/** load model for table books */
const bookModel = require(`../models/index`).book

/** load Operation from Sequelize */
const Op = require(`sequelize`).Op

/** load library path and filestream */
const path = require(`path`)
const fs = require(`fs`)

/** create function to read all data */
exports.getAllBooks = async (req, res) => {
    /** call findAll() to get all data */
    let books = await bookModel.findAll()
    return res.json({
        success: true,
        data: books,
        message: `All books have been loaded`
    })
}

/** create function for filter */
exports.findBook = async (req, res) => {
    /** define keyword to find data */
    let keyword = req.body.keyword

    /** call findAll() within where clause and operation to find data based on keyword */
    let books = await bookModel.findAll({
        where: {
            [Op.or]: [
                { isbn: { [Op.substring]: keyword } },
                { title: { [Op.substring]: keyword } },
                { author: { [Op.substring]: keyword } },
                { category: { [Op.substring]: keyword } },
                { publisher: { [Op.substring]: keyword } }
            ]
        }
    })
    return res.json({
        success: true,
        data: books,
        message: `All books have been loaded`
    })
}

/** load function from upload-cover single(cover) means just upload one file with request name cover */
const upload = require(`./upload-cover`).single(`cover`)

/** create function to add new book */
exports.addBook = (req, res) => {
    /** run function upload */
    upload(req, res, async error => {
        /** check if there are error when upload */
        if (error) {
            return res.json({ message: error })
        }

        /** check if file is empty */
        if (!req.file) {
            return res.json({ message: `Nothing to Upload` })
        }

        /** prepare data from request */
        let newBook = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            stock: req.body.stock,
            cover: req.file.filename
        }

        /** execute inserting data to books table */
        bookModel.create(newBook).then(result => {
            /** if inserts process success */
            return res.json({
                success: true,
                data: result,
                message: `New book has been inserted`
            })
        })
        .catch(error => {
            /** if inserts process failed */
            return res.json({
                success: false,
                message: error.message
            })
        })
    })
}

/** create function to update book */
exports.updateBook = async (req, res) => {
    /** run upload function */
    upload(req, res, async error => {
        /** check if there are error when upload */
        if (error) {
            return res.json({ message: error })
        }

        /** store selected book ID that will update */
        let id = req.params.id

        /** prepare books data that will update */
        let book = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            stock: req.body.stock
        }

        /** check if file is not empty, it means update data within reupload file */
        if (req.file) {
            /** get selected books data */
            const selectedBook = await bookModel.findOne({
                where: { id: id }
            })

            /** get old filename of cover file */
            const oldCoverBook = selectedBook.cover

            /** prepare path of old cover to delete file */
            const pathCover = path.join(__dirname, `../cover`, oldCoverBook)

            /** check file existence */
            if (fs.existsSync(pathCover)) {
                /** delete old cover file */
                fs.unlink(pathCover, error => console.log(error))
            }
            /** add new cover filename to book object */
            book.cover = req.file.filename
        }

        /** execute update data based on defined id book */
        bookModel.update(book, { where: { id: id } }).then(result => {
            /** if updates process success */
            return res.json({
                success: true,
                data: result,
                message: 'Data book has been updated'
            })
        })
        .catch(error => {
            /** if updates process fail */
            return res.json({
                success: false,
                message: error.message
            })
        })
    })
}

/** create function to delete book */
exports.deleteBook = async (req, res) => {
    /** store selected books ID that will be delete */
    const id = req.params.id

    /** delete cover file */
    /** get selected books data */
    const book = await bookModel.findOne({ where: { id: id } })
    /** get old filename of cover file */
    const oldCoverBook = book.cover

    /** prepare path of old cover to delete file */
    const pathCover = path.join(__dirname, `../cover`, oldCoverBook)

    /** check file existence */
    if (fs.existsSync(pathCover)) {
        /** delete old cover file */
        fs.unlink(pathCover, error => console.log(error))
    }
    /** end of delete cover file */

    /** execute delete data based on defined id book */
    bookModel.destroy({ where: { id: id } }).then(result => {
        /** if updates process success */
        return res.json({
            success: true,
            data: result,
            message: `Data book has been deleted`
        })
    })
    .catch(error => {
        /** if updates process fail */
        return res.json({
            success: false,
            message: error.message
        })
    })
}