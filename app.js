const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const db = require("../PaymentGatewayPage/util/database");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "css")));

app.get('/', (req, res, next) => {
    res.render("payment-page", {
        pageTitle: "Payment",
    });
});

app.post('/', (req, res, next) => {
    db.execute("INSERT INTO carddetails (cardHolderName, cardNumber, cvv, expdate) VALUES (?,?,?,?)",
    [req.body.cardholdername, req.body.cardnumber, req.body.cvv, req.body.expdate]).then(() => {
        res.redirect("/");
    }).catch(err => {
        console.log(err);
        res.status(500).json("Card Number already exists.");
        throw new Error(err.sqlMessage);
    });
});

app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/' });
})

app.listen(process.env.PORT || 4500);