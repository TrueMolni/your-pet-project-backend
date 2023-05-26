const  multer =require('multer') ;
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
cloudinary.config({
    cloud_name: "ddinaq6n3",
    api_key: "149358935256577",
    api_secret: "yZ1Z3Y6t9OmL_yHQbk5WESOp570",

  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: "usersPhotos",
    allowedFormats: ["jpg", "png","jpeg"],
    filename: (req, file, cb) => {
      console.log(file.originalname)
      cb(null, file.originalname);
    },
  });
  cloudinary.image("front_face.png", {
     secure: true,
     transformation: [
       { width: 161, height: 161, gravity: "face", crop: "thumb" },
       { radius: 20 },
     ],
   })
  
  const uploadUserPhoto = multer({ storage });
  
module.exports = uploadUserPhoto;