const multer = require("multer")

const storage = multer.diskStorage({
    filename: (req, file, cb) => { cb(null, file.originalname) },

})

const doctorUpload = multer({ storage }).fields([
    { name: "degree", maxCount: 1 },
])
module.exports = { doctorUpload }