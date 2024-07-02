const express = require("express");
const { db } = require("./models");
const logger = require("morgan")
const app = express();
const cors = require("cors")
require("dotenv").config();
const { specs, swaggerUi } = require("./swagger");
const PORT = process.env.PORT || 3000;

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
const userActivityRoutes = require("./routes/userActivity.js");
const productRoutes = require("./routes/product.routes.js");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/roles" , roleRoutes);
app.use("/users" , userRoutes);
app.use("/users/active-status" , userActivityRoutes);
app.use("/products" , productRoutes);

app.listen( PORT , () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
