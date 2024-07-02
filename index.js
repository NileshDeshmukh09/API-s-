const express = require("express");
const { db } = require("./models");
const logger = require("morgan")
const app = express();
const cors = require("cors")


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err);
  });


const roleRoutes = require("./routes/role.routes");
const userRoutes = require("./routes/user.routes");
app.use("" , roleRoutes);
app.use("" , userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
