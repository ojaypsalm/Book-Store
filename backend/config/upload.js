const multer = require('multer');
const path = require('path');

//configure storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); //specify the direction to save the upload
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '_' + path.extname(file.originalname)); //Append the file extension
    }
});
const upload = multer({storage: storage});

module.exports=  upload ;