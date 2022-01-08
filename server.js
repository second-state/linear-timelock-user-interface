const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public/html/index.html"));
});

app.listen(80, () => console.log("Server running..."));