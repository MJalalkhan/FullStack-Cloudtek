const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
var allowCrossDomain = function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
};
app.use(cors({ allowCrossDomain }));

// Database config
require("./config/db.config");

// Routes Config
app.use(express.json());
require("./routes/routes")(app);

const PORT = process.env.PORT || 5000;
//Listen for incoming requests
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
