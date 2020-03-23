const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controller/404");
const mongoose = require("mongoose");
const User = require("./model/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5e781a07b0d68c28653bf699")
    .then(user => {
      req.user = user;
      console.log("req user", req.user);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", errorController.get404);

const url =
  "mongodb+srv://yufei:allenzhang@cluster0-h9mm0.mongodb.net/book-shop?retryWrites=true&w=majority";
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(connection => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "yufei",
          email: "yufei.z222@gmail.com",
          cart: { items: [] }
        });
        user.save();
      }
      app.listen(3000);
    });
  })
  .catch(err => {
    console.log(err);
  });
