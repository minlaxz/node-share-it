const express = require('express');
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const dotenv = require("dotenv")

dotenv.config()
const app = express();
app.use(express.static(__dirname + '/public'));

const handleError = (err, res) => {
    console.log(err)
    res
        .status(500)
        .contentType("text/plain")
        .end(`Informative Debugger : Oops! Something went wrong!\n${err}`);
};


const getTimeStamp = () => {
    return new Date().getTime();
}

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, `${getTimeStamp()}.${path.extname(file.originalname).toLowerCase()}`);
    }
});

const upload = multer({ storage: storage }).array('file', 12);


// app.get("/", express.static(path.join(__dirname, "./public")));
app.get("/", (req, res) => {
    res.render('/index.html')
})

app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) { return handleError(err, res); }
        res.end("Upload completed.");
    });
})

// const upload = multer({
//     dest: "/home/laxz/exp-multr/"
//     // you might also want to set some limits: https://github.com/expressjs/multer#limits
// });

// app.post("/upload",
//     upload.single("file" /* name attribute of <file> element in your form */),
//     (req, res) => {
//         const tempPath = req.file.path; // /home/laxz/exp-multr/af8de3bac38e06452c14135de1a8f387 
//         let targetPath = null

//         const fileExt = path.extname(req.file.originalname).toLowerCase();
//         switch (fileExt) {
//             case ".png":
//                 targetPath = path.join(__dirname, `./uploads/${getTimeStamp()}${fileExt}`);
//                 break;
//             case ".jpg":
//             case ".jpeg":
//                 targetPath = path.join(__dirname, `./uploads/${getTimeStamp()}${fileExt}`);
//                 break;
//             default:
//                 targetPath = null;
//         }

//         if (targetPath !== null) {
//             fs.rename(tempPath, targetPath, err => { // /usr/src/app/uploads/1623255325495.jpg
//                 if (err) return handleError(err, res);
//                 res
//                     .status(200)
//                     .contentType("text/plain")
//                     .end("File uploaded!");
//             });
//         } 
//         else {
//             fs.unlink(tempPath, err => {
//                 if (err) return handleError(err, res);
//                 res
//                     .status(403)
//                     .contentType("text/plain")
//                     .end(`Only .jpg or .jpeg and .png files are allowed!\nAnd your file type is : ${fileExt}\nwhich is not supposed to be uploaded.`);
//             });
//         }
//     }
// );

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))

