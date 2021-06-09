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
        .end("Informative Debugger : Oops! Something went wrong!");
};

const getTimeStamp = () => {
    return new Date().getTime();
}

const upload = multer({
    dest: "/home/laxz/exp-multr/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

// app.get("/", express.static(path.join(__dirname, "./public")));
app.get("/" , (req, res) => {
    res.render('/index.html')
})


app.post("/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
        const tempPath = req.file.path;
        let targetPath = null

        const fileExt = path.extname(req.file.originalname).toLowerCase();
        switch (fileExt) {
            case ".png":
                targetPath = path.join(__dirname, `./uploads/${getTimeStamp()}${fileExt}`);
                break;
            case ".jpg":
            case ".jpeg":
                targetPath = path.join(__dirname, `./uploads/${getTimeStamp()}${fileExt}`);
                break;
            default:
                targetPath = null;
        }

        if (targetPath !== null) {
            fs.rename(tempPath, targetPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(200)
                    .contentType("text/plain")
                    .end("File uploaded!");
            });
        } 
        else {
            fs.unlink(tempPath, err => {
                if (err) return handleError(err, res);
                res
                    .status(403)
                    .contentType("text/plain")
                    .end(`Only .jpg or .jpeg and .png files are allowed!\nAnd your file type is : ${fileExt}\nwhich is not supposed to be uploaded.`);
            });
        }
    }
);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))

