const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes");

const app = express();
const PORT = process.env.port || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running in Port:${PORT}.`);
});
