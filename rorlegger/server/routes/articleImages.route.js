const express = require('express')
const GridFsStorage = require('multer-gridfs-storage')
const router = express.Router();
const multer = require('multer')
const mongoURI = process.env.CONNECTION_STRING_IMAGES
const crypto = require('crypto')
const ArticleController = require('../controllers/article.controller')
const Grid = require('gridfs-stream')
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectId;
const jwt = require('express-jwt')
const secret = process.env.JWT_SECRET;

const storage = new GridFsStorage({
  url: mongoURI, file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (!/(\.png|jpg)$/.test(file.originalname)) {
          return reject(err);
        }
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "articleImages",
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

//Connect to DB
const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("articleImages");
});

router.get("/", async (req, res) => {
  let imageId = await ArticleController.getImageIdByArticleId(req, res);
  gfs.files.findOne( {_id: ObjectID(imageId)}, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({ err: "No file exists" });
    } // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename); readstream.pipe(res);
    } else {
      res.status(404).json({ err: "Not an image" });
    }
  });
});

router.post("/",
  jwt({ secret, algorithms: ['HS256'] }),
  upload.single("image"),
  async (req, res, err) => {
    await ArticleController.addImageToArticle(req, res)
  if (err){
    res.status(400).send()
  }
  res.status(201).send();
});


module.exports = router;
