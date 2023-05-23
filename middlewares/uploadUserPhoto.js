const  multer =require('multer') ;
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: "ddinaq6n3",
    api_key: "149358935256577",
    api_secret: "yZ1Z3Y6t9OmL_yHQbk5WESOp570"
  });



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "usersPhotos",
    allowedFormats: ["jpg", "png","jpeg"],
    filename: (req, file, cb) => {
          cb(null, file.originalname);
    },
  });
  
  const uploadUserPhoto = multer({ storage });
  
module.exports = uploadUserPhoto;