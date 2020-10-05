require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const routes = require("./routes");

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("====Database Connected====");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`>>> App listened on PORT: ${PORT} <<<`);
});
