//* Getting app from Express
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

//* Middleware
app.use(express.json()); //* parse json bodies in the request object
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use('/uploads',express.static(path.resolve('uploads')));

//* Routes
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/product", require("./routes/productRoutes"));
// app.use("/user", require("./routes/userRoutes"));

//* Error Handling
app.use((err, req, res, next) => {
    console.log(err);
  
    res.status(500).json({
      message: "Something went rely wrong",
    });
  });
  
  //* Listen on pc port
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));