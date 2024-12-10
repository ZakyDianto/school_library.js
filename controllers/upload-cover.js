/** load library 'multer' and 'path' */
const multer = require(`multer`)
const path = require(`path`)

/** storage configuration */
const storage = multer.diskStorage({
    /** define storage folder */
    destination: (req, file, cb) => {
        cb(null, `./cover`)
    },

    /** define filename for upload file */
    filename: (req, file, cb)  => {
        cb(null, `cover-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    /** storage configuration */
    storage: storage,
    /**filter */
    fileFilter: (req, file, cb) => {
        /** filter type of file */
        const acceptedType = [`image/jpg`, `image/jpeg`, `image/png`]
        if (!acceptedType.includes(file.mimetype)) {
            cb(null, false) /** refuse upload */
            return cb(`Invalid file type (${file.mimetype})`)
        }

        /** filter size */
        const fileSize = req.headers[`content-length`]
        const maxSize = (1*1024*1024) /** max 1mb*/
        if (fileSize>maxSize) {
            cb(null, false)//refuse
            return cb(`File to large`)
        }
        cb(null, true) /** acc */
    }
})
module.exports = upload