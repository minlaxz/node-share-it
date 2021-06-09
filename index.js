const express = require('express');
const path = require("path");
const app = express();

const handleError = (err, res) => {
    console.log(err)
    res
        .status(500)
        .contentType("text/plain")
        .end("Informative Debugger : Oops! Something went wrong!");
};

app.get("/", express.static(path.join(__dirname, "./public")));


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))

