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
    // res
    //     .status(500)
    //     .contentType("text/plain")
    //     .end(`Informative Debugger : Oops! Something went wrong!\n${err}`);
    res.sendFile(`${__dirname}/public/error.html`)
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

app.get("/success", (req, res) => {
    res.sendFile(`${__dirname}/public/success.html`)
})


app.get("/error", (req, res) => {
    res.sendFile(`${__dirname}/public/error.html`)
})

app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) { return handleError(err, res); }
        res.redirect("/success");
        // res.end("Upload completed.");
    });
})


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))

