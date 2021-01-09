const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "css")));

app.get('/', (req, res, next) => {
    res.render("payment-page", {
        pageTitle: "Payment",
    });
})

app.post('/', (req, res, next) => {
    console.log(req.body.cardname,req.body.cardnumber,req.body.expdate,req.body.cvv);
    res.redirect("/");
})

app.listen(listen(process.env.PORT || 4500));