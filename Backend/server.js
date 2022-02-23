const express = require("express");
const app = express();

// Database config
require("./config/db.config");

// Routes Config
app.use(express.json()); 
require("./routes/routes")(app);

const PORT = process.env.PORT || 5000;
//Listen for incoming requests
app.listen(PORT, console.log(`server started, listening PORT ${PORT}`));
