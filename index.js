const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); //Instantiate an express app, the main work horse of this server
const port = process.env.PORT || 5000; //Save the port number where your server will be listening

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.PORT
      ? "https://prushamedia.ro"
      : "http://localhost:3000"
  );
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

require("./services/mail.service")(app);

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
