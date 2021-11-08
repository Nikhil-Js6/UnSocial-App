const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null, "public/images");
    },
    filename: (req, file, cb) => {
         cb(null, `${new Date().getFullYear()}_${new Date().getMonth()}-${new Date().getDay()}_${new Date().getDay()}-${new Date().getHours()}_${new Date().getMinutes()}-${file.originalname}`);
    }
});
const postUpload = multer({ storage });

router.post("/", postUpload.single("file"), (req, res) => {
    try {
        return res.status(200).json({ message: "File uploaded Successfully"});
    }catch(err) {
         res.status(500).json(err);
    }
});

const profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null, "public/images/profilePic");
    },
    filename: (req, file, cb) => {
         cb(null, file.originalname);
    }
});
const profilePicUpload = multer({profilePicStorage});

router.post("/profilePic", profilePicUpload.single("profilePic"), (req, res) => {
    try {
        return res.status(200).json({ message: "File uploaded Successfully"});
    }catch(err) {
         res.status(500).json(err);
    }
});

const coverPicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
         cb(null, "public/images/coverPic");
    },
    filename: (req, file, cb) => {
         cb(null, file.originalname);
    }
});
const coverPicUpload = multer({coverPicStorage});

router.post("/coverPic", coverPicUpload.single("coverPic"), (req, res) => {
    try {
        return res.status(200).json({ message: "File uploaded Successfully"});
    }catch(err) {
         res.status(500).json(err);
    }
});

module.exports = router;
