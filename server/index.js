const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");
const uiRoutes = require("./routes/ui");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5001;

// connection string: mongodb+srv://lcarlson144:daM1acZv5fflMmMZ@shoppingcart.kniic.mongodb.net/?retryWrites=true&w=majority&appName=shoppingCart

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use("/api", apiRoutes);
app.use("/ui", uiRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
