const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"uploads/");
    },
    filename:function(req,file,cb) {
        cb(null, Date.now()+path.extname(file.originalname));
    }
})

const fileFilter = (req,file,cb) => {
    const allowedTypes = /jpg|jpeg|png|gif/;
    const fileType = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if(fileType) {
        cb(null,true);
    }
    else {
        cb(new Error("Only images allowed"),false);
    }
}

const upload = multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},
    fileFilter:fileFilter,
})
module.exports = upload;