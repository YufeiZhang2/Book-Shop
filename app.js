const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controller/404");
const mongoConnect = require("./util/databse").mongoConnect;
const User = require("./model/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5e74c6f034aa66a81256e8e7")
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      console.log(req.user);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", errorController.get404);

mongoConnect(() => {
  app.listen(3000);
});
