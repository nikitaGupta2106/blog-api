const express = require("express");
const app = express();
app.use(express.json());

require("dotenv").config();

const cors = require("cors");
app.use(cors());

const { connection } = require("./Config/db");
const { authRouter } = require("./Routes/auth.routes");
const { authentication } = require("./Middleware/authentication");
const { blogRouter } = require("./Routes/blogs.routes");

// base endpoint
app.get("/", (req, res) => {
  res.send("Base Blog API");
});

//end points and routes
app.use("/auth", authRouter);
app.use("/blogs", authentication, blogRouter);

// port 3000 and connection to DB
app.listen(3000, async () => {
  try {
    await connection;
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(error);
    console.log("Error connnecting to the database");
  }
  console.log("listening on port 3000");
});
