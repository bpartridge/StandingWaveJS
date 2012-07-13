// Simple static server using connect
var connect = require("connect");
var app = connect();
app.use(connect.static(__dirname));

var port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log("Listening on port " + port + "; go to /index.html for an example/test document.");
});
