var express = require('express');
var env = process.env.NODE_ENV || 'development',
    cfg = require('./config/'+env);
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

var router = express.Router();

router.get("/", function(req, res) {
    res.json({"message" : "Hello World!"});
});

router.get("/about",function(req,res){
  res.sendFile(__dirname + "/public/about.html");
});

// Handle 404 error. The last middleware
app.use("*",function(req,res){
  res.sendFile(__dirname + "/public/404.html");
});

app.use("/", router);

app.listen(cfg.PORT, function(){
  console.log("Magic happens on port "+cfg.PORT);
});
